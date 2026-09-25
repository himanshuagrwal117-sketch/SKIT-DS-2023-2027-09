import subprocess
from collections import defaultdict
import datetime
import io
import os
import sys
import html

import matplotlib.pyplot as plt

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
    KeepTogether,
)
from reportlab.lib.styles import (
    getSampleStyleSheet,
    ParagraphStyle,
)


# ============================================================
# CONFIGURATION
# ============================================================

COLLEGE_NAME = (
    "Swami Keshvanand Institute of Technology,"
    " Management & Gramothan, Jaipur"
)

DEPARTMENT_NAME = (
    "Department of Computer Science & Engineering"
)


# ============================================================
# GET REPOSITORY INFORMATION
# ============================================================

def get_repo_info():
    """
    Get repository name and current branch.
    Works locally and inside GitHub Actions.
    """

    repo_name = "Project-Repository"
    branch_name = "main"

    # Get repository root
    try:
        root_path = subprocess.check_output(
            ["git", "rev-parse", "--show-toplevel"],
            encoding="utf-8",
            errors="replace",
        ).strip()

        repo_name = os.path.basename(root_path)

    except Exception:
        # Fallback: get repository name from remote URL
        try:
            remote_url = subprocess.check_output(
                ["git", "config", "--get", "remote.origin.url"],
                encoding="utf-8",
                errors="replace",
            ).strip()

            repo_name = (
                remote_url
                .rstrip("/")
                .split("/")[-1]
                .replace(".git", "")
            )

        except Exception:
            repo_name = os.path.basename(os.getcwd())

    # Get current branch
    try:
        branch_name = subprocess.check_output(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            encoding="utf-8",
            errors="replace",
        ).strip()

    except Exception:
        pass

    return repo_name, branch_name


# ============================================================
# GET GIT METRICS
# ============================================================

def get_git_metrics(interval="weekly"):
    """
    Parse Git commit history.

    Supported intervals:
        weekly
        monthly
        final
    """

    today = datetime.date.today()

    # IMPORTANT:
    # --date=short must be an actual git option.
    # It must NOT come after "--".
    git_args = [
        "git",
        "log",
        "--no-merges",
        "--date=short",
        "--pretty=format:COMMIT|||%h|||%an|||%ad|||%s",
        "--numstat",
    ]

    # --------------------------------------------------------
    # Select date range
    # --------------------------------------------------------

    if interval == "weekly":

        since_date = (
            today - datetime.timedelta(days=7)
        ).strftime("%Y-%m-%d")

        git_args.append(f"--since={since_date}")

        scope_title = (
            f"Last 7 Days (Since {since_date})"
        )

    elif interval == "monthly":

        since_date = (
            today - datetime.timedelta(days=30)
        ).strftime("%Y-%m-%d")

        git_args.append(f"--since={since_date}")

        scope_title = (
            f"Last 30 Days (Since {since_date})"
        )

    else:

        scope_title = (
            "Complete Project Lifecycle (All Commits)"
        )

    # --------------------------------------------------------
    # Execute Git
    # --------------------------------------------------------

    try:
        raw_output = subprocess.check_output(
            git_args,
            encoding="utf-8",
            errors="replace",
        )

    except subprocess.CalledProcessError as error:

        print(
            "[ERROR] Git command failed."
        )

        print(error)

        return None, None, None, scope_title

    # --------------------------------------------------------
    # Data structures
    # --------------------------------------------------------

    students = defaultdict(
        lambda: {
            "commits": 0,
            "added": 0,
            "deleted": 0,
            "active_days": set(),
        }
    )

    timeline_activity = defaultdict(
        lambda: defaultdict(int)
    )

    student_logs = defaultdict(list)

    current_author = None
    current_date_str = None

    # --------------------------------------------------------
    # Parse Git output
    # --------------------------------------------------------

    for line in raw_output.splitlines():

        line = line.strip()

        if not line:
            continue

        # ----------------------------------------------------
        # New commit
        # ----------------------------------------------------

        if line.startswith("COMMIT|||"):

            parts = line.split("|||", 4)

            if len(parts) < 5:
                current_author = None
                continue

            sha = parts[1].strip()
            author = parts[2].strip()
            date_str = parts[3].strip()
            message = parts[4].strip()

            # Ignore automated GitHub bots
            author_lower = author.lower()

            if (
                "bot" in author_lower
                or "github-actions" in author_lower
            ):
                current_author = None
                current_date_str = None
                continue

            current_author = author
            current_date_str = date_str

            students[author]["commits"] += 1

            students[author]["active_days"].add(
                date_str
            )

            student_logs[author].append(
                (
                    date_str,
                    sha,
                    message,
                )
            )

            # Timeline
            try:

                commit_date = datetime.datetime.strptime(
                    date_str,
                    "%Y-%m-%d",
                ).date()

                if interval == "weekly":

                    period_key = commit_date.strftime(
                        "%a (%b %d)"
                    )

                elif interval == "monthly":

                    iso = commit_date.isocalendar()

                    period_key = (
                        f"{iso[0]}-W{iso[1]:02d}"
                    )

                else:

                    period_key = commit_date.strftime(
                        "%Y-%m"
                    )

                timeline_activity[
                    period_key
                ][author] += 1

            except Exception:
                pass

        # ----------------------------------------------------
        # Numstat line
        # ----------------------------------------------------

        elif (
            current_author
            and not line.startswith("COMMIT|||")
        ):

            parts = line.split()

            # Normal numstat format:
            # added deleted filename

            if (
                len(parts) >= 2
                and parts[0].isdigit()
                and parts[1].isdigit()
            ):

                students[current_author]["added"] += (
                    int(parts[0])
                )

                students[current_author]["deleted"] += (
                    int(parts[1])
                )

    return (
        students,
        timeline_activity,
        student_logs,
        scope_title,
    )


# ============================================================
# CREATE CHARTS
# ============================================================

def create_charts(
    students,
    timeline_activity,
    interval,
):
    """
    Generate:
    1. Commit timeline
    2. Net LOC chart
    """

    fig, (ax1, ax2) = plt.subplots(
        1,
        2,
        figsize=(11, 3.8),
    )

    authors = list(students.keys())
    periods = sorted(timeline_activity.keys())

    # --------------------------------------------------------
    # Chart 1: Commit Timeline
    # --------------------------------------------------------

    if periods and authors:

        for author in authors:

            counts = [
                timeline_activity[period].get(
                    author,
                    0,
                )
                for period in periods
            ]

            ax1.plot(
                periods,
                counts,
                marker="o",
                linewidth=2,
                label=author,
            )

        ax1.set_title(
            f"Commit Timeline ({interval.capitalize()})",
            fontsize=10,
            fontweight="bold",
        )

        ax1.set_ylabel("Commits")

        ax1.tick_params(
            axis="x",
            rotation=30,
            labelsize=7,
        )

        ax1.grid(
            True,
            linestyle="--",
            alpha=0.5,
        )

        # Avoid extremely large legends
        if len(authors) <= 10:
            ax1.legend(
                fontsize=7,
                loc="best",
            )

    else:

        ax1.text(
            0.5,
            0.5,
            "No commits found in this interval",
            ha="center",
            va="center",
        )

        ax1.set_axis_off()

    # --------------------------------------------------------
    # Chart 2: Net Lines of Code
    # --------------------------------------------------------

    if authors:

        net_loc = [
            students[author]["added"]
            - students[author]["deleted"]
            for author in authors
        ]

        ax2.bar(
            authors,
            net_loc,
            width=0.45,
        )

        ax2.set_title(
            "Net Lines of Code Written",
            fontsize=10,
            fontweight="bold",
        )

        ax2.set_ylabel(
            "LOC (Added - Deleted)"
        )

        ax2.tick_params(
            axis="x",
            rotation=30,
            labelsize=7,
        )

        ax2.grid(
            axis="y",
            linestyle="--",
            alpha=0.5,
        )

    else:

        ax2.text(
            0.5,
            0.5,
            "No LOC changes recorded",
            ha="center",
            va="center",
        )

        ax2.set_axis_off()

    plt.tight_layout()

    # Save chart into memory
    image_buffer = io.BytesIO()

    plt.savefig(
        image_buffer,
        format="png",
        dpi=200,
        bbox_inches="tight",
    )

    plt.close(fig)

    image_buffer.seek(0)

    return Image(
        image_buffer,
        width=500,
        height=175,
    )


# ============================================================
# GENERATE PDF
# ============================================================

def generate_pdf(interval="weekly"):

    repo_name, branch_name = get_repo_info()

    (
        students,
        timeline_activity,
        student_logs,
        scope_title,
    ) = get_git_metrics(interval)

    if students is None:
        return

    date_stamp = datetime.date.today().strftime(
        "%Y-%m-%d"
    )

    # --------------------------------------------------------
    # Report title and filename
    # --------------------------------------------------------

    if interval == "weekly":

        report_title = (
            "Weekly Progress Report (Form-3)"
        )

        doc_name = (
            f"{repo_name}"
            f"_Weekly_Progress_Report_Form-3_"
            f"{date_stamp}.pdf"
        )

    elif interval == "monthly":

        report_title = (
            "Monthly Progress Report (Form-3)"
        )

        doc_name = (
            f"{repo_name}"
            f"_Monthly_Progress_Report_Form-3_"
            f"{date_stamp}.pdf"
        )

    else:

        report_title = (
            "Final Project Evaluation Report"
        )

        doc_name = (
            f"{repo_name}"
            f"_Final_Report_"
            f"{date_stamp}.pdf"
        )

    # --------------------------------------------------------
    # PDF document
    # --------------------------------------------------------

    doc = SimpleDocTemplate(
        doc_name,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=30,
        bottomMargin=30,
    )

    styles = getSampleStyleSheet()

    # --------------------------------------------------------
    # Styles
    # --------------------------------------------------------

    college_style = ParagraphStyle(
        "CollegeStyle",
        parent=styles["Heading1"],
        fontSize=13.5,
        leading=17,
        textColor=colors.HexColor("#0F172A"),
        alignment=1,
        spaceAfter=2,
    )

    dept_style = ParagraphStyle(
        "DeptStyle",
        parent=styles["Normal"],
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor("#475569"),
        alignment=1,
        spaceAfter=6,
    )

    title_style = ParagraphStyle(
        "TitleStyle",
        parent=styles["Heading2"],
        fontSize=13,
        leading=17,
        textColor=colors.HexColor("#1A365D"),
        alignment=1,
        spaceAfter=5,
    )

    repo_style = ParagraphStyle(
        "RepoStyle",
        parent=styles["Normal"],
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#0F172A"),
        spaceAfter=3,
    )

    meta_style = ParagraphStyle(
        "MetaStyle",
        parent=styles["Normal"],
        fontSize=8.5,
        textColor=colors.HexColor("#64748B"),
        spaceAfter=8,
    )

    section_style = ParagraphStyle(
        "SectionStyle",
        parent=styles["Heading2"],
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor("#0F172A"),
        spaceBefore=7,
        spaceAfter=4,
    )

    sub_section_style = ParagraphStyle(
        "SubSectionStyle",
        parent=styles["Heading3"],
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#2563EB"),
        spaceBefore=5,
        spaceAfter=2,
    )

    msg_style = ParagraphStyle(
        "MsgStyle",
        parent=styles["Normal"],
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#1E293B"),
    )

    meta_cell_style = ParagraphStyle(
        "MetaCellStyle",
        parent=styles["Normal"],
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#475569"),
        alignment=1,
    )

    marks_style = ParagraphStyle(
        "MarksStyle",
        parent=styles["Normal"],
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#0F172A"),
        alignment=1,
    )

    sig_block_style = ParagraphStyle(
        "SigBlockStyle",
        parent=styles["Normal"],
        fontSize=9,
        leading=15,
        textColor=colors.HexColor("#0F172A"),
        alignment=0,
    )

    story = []

    # ========================================================
    # HEADER
    # ========================================================

    story.append(
        Paragraph(
            f"<b>{html.escape(COLLEGE_NAME)}</b>",
            college_style,
        )
    )

    story.append(
        Paragraph(
            f"<b>{html.escape(DEPARTMENT_NAME)}</b>",
            dept_style,
        )
    )

    story.append(
        Paragraph(
            f"<u><b>{report_title}</b></u>",
            title_style,
        )
    )

    story.append(
        Spacer(1, 3)
    )

    # ========================================================
    # PROJECT METADATA
    # ========================================================

    story.append(
        Paragraph(
            f"<b>Project Repository:</b> "
            f"<font color='#2563EB'>"
            f"<b>{html.escape(repo_name)}</b>"
            f"</font>"
            f" &nbsp;|&nbsp; "
            f"<b>Branch:</b> "
            f"<code>{html.escape(branch_name)}</code>",
            repo_style,
        )
    )

    story.append(
        Paragraph(
            f"<b>Evaluation Window:</b> "
            f"{html.escape(scope_title)}"
            f" &nbsp;|&nbsp; "
            f"<b>Generated On:</b> "
            f"{datetime.date.today().strftime('%B %d, %Y')}",
            meta_style,
        )
    )

    # ========================================================
    # INDIVIDUAL CONTRIBUTION TABLE
    # ========================================================

    story.append(
        Paragraph(
            "1. Individual Contribution Breakdown",
            section_style,
        )
    )

    total_commits = sum(
        data["commits"]
        for data in students.values()
    )

    table_data = [
        [
            "Student Name",
            "Commits (%)",
            "Lines Added",
            "Lines Deleted",
            "Net LOC",
            "Active Days",
        ]
    ]

    if students:

        # Sort by number of commits
        sorted_students = sorted(
            students.items(),
            key=lambda item: item[1]["commits"],
            reverse=True,
        )

        for name, data in sorted_students:

            percentage = (
                data["commits"]
                / total_commits
                * 100
                if total_commits > 0
                else 0
            )

            net = (
                data["added"]
                - data["deleted"]
            )

            table_data.append(
                [
                    html.escape(name),
                    f"{data['commits']} "
                    f"({percentage:.1f}%)",
                    f"+{data['added']:,}",
                    f"-{data['deleted']:,}",
                    f"{net:,}",
                    f"{len(data['active_days'])} days",
                ]
            )

    else:

        table_data.append(
            [
                "No commits found in this period.",
                "-",
                "-",
                "-",
                "-",
                "-",
            ]
        )

    contribution_table = Table(
        table_data,
        colWidths=[
            120,
            80,
            80,
            80,
            80,
            100,
        ],
        repeatRows=1,
    )

    contribution_table.setStyle(
        TableStyle(
            [
                (
                    "BACKGROUND",
                    (0, 0),
                    (-1, 0),
                    colors.HexColor("#1E293B"),
                ),
                (
                    "TEXTCOLOR",
                    (0, 0),
                    (-1, 0),
                    colors.whitesmoke,
                ),
                (
                    "ALIGN",
                    (0, 0),
                    (-1, -1),
                    "CENTER",
                ),
                (
                    "ALIGN",
                    (0, 1),
                    (0, -1),
                    "LEFT",
                ),
                (
                    "FONTNAME",
                    (0, 0),
                    (-1, 0),
                    "Helvetica-Bold",
                ),
                (
                    "FONTSIZE",
                    (0, 0),
                    (-1, -1),
                    8,
                ),
                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, -1),
                    3.5,
                ),
                (
                    "TOPPADDING",
                    (0, 0),
                    (-1, -1),
                    3.5,
                ),
                (
                    "GRID",
                    (0, 0),
                    (-1, -1),
                    0.5,
                    colors.HexColor("#CBD5E1"),
                ),
                (
                    "ROWBACKGROUNDS",
                    (0, 1),
                    (-1, -1),
                    [
                        colors.white,
                        colors.HexColor("#F8FAFC"),
                    ],
                ),
            ]
        )
    )

    story.append(
        contribution_table
    )

    story.append(
        Spacer(1, 6)
    )

    # ========================================================
    # CHARTS
    # ========================================================

    story.append(
        Paragraph(
            "2. Visual Trends & Volume",
            section_style,
        )
    )

    chart_image = create_charts(
        students,
        timeline_activity,
        interval,
    )

    story.append(
        chart_image
    )

    story.append(
        Spacer(1, 6)
    )

    # ========================================================
    # DETAILED COMMIT LOGS
    # ========================================================

    story.append(
        Paragraph(
            f"3. Detailed Commit Logs & Mentor Evaluation "
            f"({interval.capitalize()})",
            section_style,
        )
    )

    if not student_logs:

        story.append(
            Paragraph(
                "<i>No commit logs found for this timeframe.</i>",
                styles["Normal"],
            )
        )

    else:

        # Sort students by name
        sorted_logs = sorted(
            student_logs.items(),
            key=lambda item: item[0].lower(),
        )

        for student_name, logs in sorted_logs:

            story.append(
                Paragraph(
                    f"<b>Student:</b> "
                    f"{html.escape(student_name)}"
                    f" — "
                    f"<i>{len(logs)} commit(s)</i>",
                    sub_section_style,
                )
            )

            log_table_data = [
                [
                    "Date",
                    "Hash",
                    "Commit Message",
                    "Mentor Marks (/10)",
                ]
            ]

            # First commit row
            first_date, first_sha, first_msg = logs[0]

            safe_msg = (
                html.escape(first_msg)
                if first_msg
                else "(No commit message)"
            )

            log_table_data.append(
                [
                    Paragraph(
                        html.escape(first_date),
                        meta_cell_style,
                    ),
                    Paragraph(
                        f"<code>{html.escape(first_sha)}</code>",
                        meta_cell_style,
                    ),
                    Paragraph(
                        safe_msg,
                        msg_style,
                    ),
                    Paragraph(
                        "<b>_____ / 10</b>",
                        marks_style,
                    ),
                ]
            )

            # Remaining commit rows
            for (
                date_value,
                sha_value,
                message_value,
            ) in logs[1:]:

                safe_msg = (
                    html.escape(message_value)
                    if message_value
                    else "(No commit message)"
                )

                log_table_data.append(
                    [
                        Paragraph(
                            html.escape(date_value),
                            meta_cell_style,
                        ),
                        Paragraph(
                            f"<code>"
                            f"{html.escape(sha_value)}"
                            f"</code>",
                            meta_cell_style,
                        ),
                        Paragraph(
                            safe_msg,
                            msg_style,
                        ),
                        "",
                    ]
                )

            number_of_rows = len(
                log_table_data
            )

            log_table = Table(
                log_table_data,
                colWidths=[
                    65,
                    50,
                    335,
                    90,
                ],
                repeatRows=1,
            )

            log_table.setStyle(
                TableStyle(
                    [
                        (
                            "BACKGROUND",
                            (0, 0),
                            (-1, 0),
                            colors.HexColor("#475569"),
                        ),
                        (
                            "TEXTCOLOR",
                            (0, 0),
                            (-1, 0),
                            colors.whitesmoke,
                        ),
                        (
                            "ALIGN",
                            (0, 0),
                            (-1, -1),
                            "LEFT",
                        ),
                        (
                            "ALIGN",
                            (3, 0),
                            (3, -1),
                            "CENTER",
                        ),
                        (
                            "FONTNAME",
                            (0, 0),
                            (-1, 0),
                            "Helvetica-Bold",
                        ),
                        (
                            "FONTSIZE",
                            (0, 0),
                            (-1, -1),
                            7.5,
                        ),
                        (
                            "BOTTOMPADDING",
                            (0, 0),
                            (-1, -1),
                            2.5,
                        ),
                        (
                            "TOPPADDING",
                            (0, 0),
                            (-1, -1),
                            2.5,
                        ),
                        (
                            "GRID",
                            (0, 0),
                            (-1, -1),
                            0.5,
                            colors.HexColor("#CBD5E1"),
                        ),
                        (
                            "ROWBACKGROUNDS",
                            (0, 1),
                            (2, -1),
                            [
                                colors.white,
                                colors.HexColor("#F8FAFC"),
                            ],
                        ),
                        (
                            "SPAN",
                            (3, 1),
                            (3, number_of_rows - 1),
                        ),
                        (
                            "VALIGN",
                            (3, 1),
                            (3, number_of_rows - 1),
                            "MIDDLE",
                        ),
                        (
                            "BACKGROUND",
                            (3, 1),
                            (3, number_of_rows - 1),
                            colors.HexColor("#FEF3C7"),
                        ),
                    ]
                )
            )

            story.append(
                log_table
            )

            story.append(
                Spacer(1, 7)
            )

    # ========================================================
    # SIGNATURE SECTION
    # ========================================================

    story.append(
        Spacer(1, 16)
    )

    mentor_cell = [
        Paragraph(
            "<b>Name:</b> "
            "___________________________",
            sig_block_style,
        ),
        Paragraph(
            "<b>Designation:</b> Project Mentor",
            sig_block_style,
        ),
        Spacer(1, 6),
        Paragraph(
            "<b>Signature:</b> "
            "________________________",
            sig_block_style,
        ),
    ]

    coordinator_cell = [
        Paragraph(
            "<b>Name:</b> "
            "___________________________",
            sig_block_style,
        ),
        Paragraph(
            "<b>Designation:</b> Lab Coordinator",
            sig_block_style,
        ),
        Spacer(1, 6),
        Paragraph(
            "<b>Signature:</b> "
            "________________________",
            sig_block_style,
        ),
    ]

    signature_table = Table(
        [
            [
                mentor_cell,
                coordinator_cell,
            ]
        ],
        colWidths=[
            270,
            270,
        ],
    )

    signature_table.setStyle(
        TableStyle(
            [
                (
                    "VALIGN",
                    (0, 0),
                    (-1, -1),
                    "TOP",
                ),
                (
                    "LEFTPADDING",
                    (0, 0),
                    (0, -1),
                    0,
                ),
                (
                    "LEFTPADDING",
                    (1, 0),
                    (1, -1),
                    40,
                ),
                (
                    "RIGHTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),
                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),
                (
                    "TOPPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),
            ]
        )
    )

    story.append(
        KeepTogether(signature_table)
    )

    # ========================================================
    # BUILD PDF
    # ========================================================

    doc.build(story)

    print()
    print(
        f"[SUCCESS] Generated: {doc_name}"
    )

    print(
        f" -> Found {len(students)} student(s)"
        f" and {total_commits} total commits."
    )


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    chosen_interval = (
        sys.argv[1].lower()
        if len(sys.argv) > 1
        else "weekly"
    )

    valid_intervals = {
        "weekly",
        "monthly",
        "final",
    }

    if chosen_interval not in valid_intervals:

        print(
            "Invalid interval."
        )

        print(
            "Use: weekly, monthly, or final"
        )

        sys.exit(1)

    generate_pdf(
        chosen_interval
    )
