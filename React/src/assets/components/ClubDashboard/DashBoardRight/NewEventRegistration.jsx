
import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  CalendarDays,
  Clock3,
  MapPin,
  FileText,
  UploadCloud,
  Trash2,
  Trophy,
  Save,
  Send,
  Sparkles,
  Info,
  ClipboardList,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Building2,
} from "lucide-react";

const INITIAL_FORM = {
  eventName: "",
  motive: "",
  eventDate: "",
  startTime: "",
  endTime: "",
  venue: "",
  requirements: "",
  trophyCount: 0,
  proposal: null,
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const Field = ({ label, required, hint, children }) => (
  <div className="flex min-w-0 flex-col gap-1.5">
    <label className="text-[12px] font-semibold text-[#34302f]">
      {label}
      {required && <span className="ml-1 text-[#aa3934]">*</span>}
    </label>
    {children}
    {hint && (
      <p className="text-[10px] leading-relaxed text-[#9a918e]">{hint}</p>
    )}
  </div>
);

const inputStyle =
  "h-[43px] w-full min-w-0 rounded-[10px] border border-[#e8e3e1] bg-white px-3.5 text-[12px] font-medium text-[#302b29] outline-none transition-all duration-200 placeholder:text-[#b4adaa] focus:border-[#983530] focus:ring-[3px] focus:ring-[#983530]/10";

const SectionHeading = ({ number, icon: Icon, title, subtitle }) => (
  <div className="mb-5 flex items-start gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-[#983530]/[0.07] text-[#983530]">
      <Icon size={17} strokeWidth={1.8} />
    </div>
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <h3 className="text-[14px] font-bold tracking-[-0.02em] text-[#282322]">
          {title}
        </h3>
        <span className="text-[10px] font-semibold text-[#b6adaa]">
          {number}
        </span>
      </div>
      <p className="mt-0.5 text-[11px] text-[#9b9290]">{subtitle}</p>
    </div>
  </div>
);

const NewEventReigistration = ({
  isOpen,
  onClose,
  onSaveDraft,
  onSubmit,
  clubName = "Your Club",
}) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fileError, setFileError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [trophyEnabled, setTrophyEnabled] = useState(false);

  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const headingId = useId();

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setFormError("");
  };

  // ================= MODAL EFFECTS =================
  useEffect(() => {
    if (!isOpen) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape" && !isSaving) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEscape);

    const focusTimer = window.setTimeout(() => {
      modalRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleEscape);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, onClose, isSaving]);

  // ================= FILE UPLOAD =================
  const handleFile = (file) => {
    if (!file) return;

    setFileError("");

    if (file.type !== "application/pdf") {
      setFileError("Please upload a PDF document only.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be under 10 MB.");
      return;
    }

    updateField("proposal", file);
  };

  const removeFile = () => {
    updateField("proposal", null);
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (size) => {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    if (!form.eventName.trim()) {
      return "Please enter the event name.";
    }

    if (!form.motive.trim()) {
      return "Please describe the motive of the event.";
    }

    if (!form.eventDate) {
      return "Please select the event date.";
    }

    if (!form.startTime) {
      return "Please select the starting time.";
    }

    if (!form.venue.trim()) {
      return "Please enter the event venue.";
    }

    if (
      form.endTime &&
      form.endTime <= form.startTime
    ) {
      return "End time must be after start time.";
    }

    return "";
  };

  // ================= SAVE / SUBMIT =================
  const handleAction = async (action) => {
    if (isSaving) return;

    if (action === "submit") {
      const error = validateForm();

      if (error) {
        setFormError(error);
        return;
      }
    }

    const payload = {
      ...form,
      eventName: form.eventName.trim(),
      motive: form.motive.trim(),
      venue: form.venue.trim(),
      requirements: form.requirements.trim(),
      trophyCount: trophyEnabled
        ? Number(form.trophyCount)
        : 0,
      clubName,
      status: action === "draft" ? "draft" : "pending",
    };

    const callback =
      action === "draft" ? onSaveDraft : onSubmit;

    if (!callback) {
      setFormError(
        "This action is not connected yet. Please connect the save/submit handler."
      );
      return;
    }

    setIsSaving(true);
    setFormError("");

    try {
      await callback(payload);
      setForm(INITIAL_FORM);
      setTrophyEnabled(false);
      setFileError("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onClose?.();
    } catch (error) {
      setFormError(
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#130b0a]/65 p-3 backdrop-blur-[9px] sm:p-5"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSaving
        ) {
          onClose?.();
        }
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative flex h-[min(790px,94dvh)] w-full max-w-[1120px] flex-col overflow-hidden rounded-[22px] bg-[#fdfcfb] shadow-[0_30px_100px_rgba(0,0,0,0.35)] outline-none"
      >
        {/* ================= TOP HEADER ================= */}
        <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-[#eee8e6] bg-white px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-[13px] bg-[#983530] text-white shadow-[0_5px_15px_rgba(152,53,48,0.16)]">
              <CalendarDays size={20} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <div className="mb-0.5 flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#983530]">
                  Club Event Management
                </span>
                <span className="hidden rounded-full bg-[#f7efed] px-2 py-0.5 text-[9px] font-semibold text-[#983530] sm:inline-flex">
                  NEW REQUEST
                </span>
              </div>

              <h2
                id={headingId}
                className="truncate text-[19px] font-bold tracking-[-0.035em] text-[#25201f] sm:text-[23px]"
              >
                Create New Event
              </h2>

              <p className="mt-0.5 hidden text-[11px] text-[#948b88] sm:block">
                Plan your event and submit it for ECA approval.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onClose?.()}
            disabled={isSaving}
            aria-label="Close event registration"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#eee8e6] bg-[#faf8f7] text-[#736966] transition-all hover:border-[#983530]/20 hover:bg-[#983530] hover:text-white disabled:opacity-50"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        {/* ================= SCROLLABLE BODY ================= */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px]">

            {/* ================= LEFT COLUMN ================= */}
            <div className="min-w-0 px-5 py-6 sm:px-7 sm:py-7">

              {/* SECTION 01 */}
              <section>
                <SectionHeading
                  number="01"
                  icon={ClipboardList}
                  title="Event Information"
                  subtitle="Start with the essential details of your event."
                />

                <div className="space-y-4">

                  <Field label="Event Name" required>
                    <input
                      type="text"
                      value={form.eventName}
                      onChange={(e) =>
                        updateField("eventName", e.target.value)
                      }
                      placeholder="e.g. CodeFiesta 2026"
                      maxLength={120}
                      className={inputStyle}
                    />
                  </Field>

                  <Field
                    label="Event Motive & Description"
                    required
                    hint="Explain the purpose, objectives and expected outcome of the event."
                  >
                    <textarea
                      value={form.motive}
                      onChange={(e) =>
                        updateField("motive", e.target.value)
                      }
                      placeholder="What is this event about? What will participants learn or experience?"
                      rows={4}
                      maxLength={3000}
                      className={`${inputStyle} h-auto min-h-[108px] resize-y py-3 leading-[1.7]`}
                    />
                  </Field>

                </div>
              </section>

              <div className="my-7 h-px bg-[#eee9e7]" />

              {/* SECTION 02 */}
              <section>
                <SectionHeading
                  number="02"
                  icon={CalendarDays}
                  title="Schedule & Location"
                  subtitle="Specify when and where your event will take place."
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <Field label="Event Date" required>
                    <div className="relative">
                      <input
                        type="date"
                        value={form.eventDate}
                        onChange={(e) =>
                          updateField("eventDate", e.target.value)
                        }
                        className={`${inputStyle} pr-3`}
                      />
                    </div>
                  </Field>

                  <Field label="Venue" required>
                    <div className="relative">
                      <MapPin
                        size={15}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a89d99]"
                      />
                      <input
                        type="text"
                        value={form.venue}
                        onChange={(e) =>
                          updateField("venue", e.target.value)
                        }
                        placeholder="e.g. Civil Front"
                        className={`${inputStyle} pl-10`}
                      />
                    </div>
                  </Field>

                  <Field label="Start Time" required>
                    <input
                      type="time"
                      value={form.startTime}
                      onChange={(e) =>
                        updateField("startTime", e.target.value)
                      }
                      className={inputStyle}
                    />
                  </Field>

                  <Field label="End Time">
                    <input
                      type="time"
                      value={form.endTime}
                      onChange={(e) =>
                        updateField("endTime", e.target.value)
                      }
                      className={inputStyle}
                    />
                  </Field>

                </div>
              </section>

              <div className="my-7 h-px bg-[#eee9e7]" />

              {/* SECTION 03 */}
              <section>
                <SectionHeading
                  number="03"
                  icon={Building2}
                  title="Requirements from ECA"
                  subtitle="Mention any resources or assistance required."
                />

                <Field
                  label="Requirements / Support Needed"
                  hint="Leave this blank if no support is required."
                >
                  <textarea
                    value={form.requirements}
                    onChange={(e) =>
                      updateField("requirements", e.target.value)
                    }
                    placeholder="e.g. Projector, sound system, seating arrangements, extension boards, permissions..."
                    rows={4}
                    maxLength={3000}
                    className={`${inputStyle} h-auto min-h-[110px] resize-y py-3 leading-[1.7]`}
                  />
                </Field>
              </section>

            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <aside className="min-w-0 border-t border-[#eee9e7] bg-[#faf8f7] px-5 py-6 sm:px-7 lg:border-l lg:border-t-0 lg:px-6 lg:py-7">

              {/* CLUB INFO */}
              <div className="mb-6 rounded-[14px] border border-[#e9e0dd] bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#983530]/10 text-[#983530]">
                    <Building2 size={16} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a8e8a]">
                    Organizing Club
                  </span>
                </div>

                <p className="truncate text-[15px] font-bold text-[#302825]">
                  {clubName}
                </p>

                <p className="mt-1 text-[10px] text-[#a69b97]">
                  Event request will be submitted under this club.
                </p>
              </div>

              {/* TROPHIES */}
              <section>
                <SectionHeading
                  number="04"
                  icon={Trophy}
                  title="Trophies & Awards"
                  subtitle="Specify trophy requirements."
                />

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTrophyEnabled(false);
                      updateField("trophyCount", 0);
                    }}
                    className={`flex h-[42px] items-center justify-center gap-2 rounded-[10px] border text-[11px] font-semibold transition-all ${
                      !trophyEnabled
                        ? "border-[#983530] bg-[#983530]/[0.07] text-[#983530]"
                        : "border-[#e8e0dd] bg-white text-[#817672] hover:border-[#bdaaa4]"
                    }`}
                  >
                    <X size={13} />
                    No Trophies
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTrophyEnabled(true);
                      updateField("trophyCount", 1);
                    }}
                    className={`flex h-[42px] items-center justify-center gap-2 rounded-[10px] border text-[11px] font-semibold transition-all ${
                      trophyEnabled
                        ? "border-[#983530] bg-[#983530]/[0.07] text-[#983530]"
                        : "border-[#e8e0dd] bg-white text-[#817672] hover:border-[#bdaaa4]"
                    }`}
                  >
                    <Trophy size={13} />
                    Add Trophies
                  </button>
                </div>

                {trophyEnabled && (
                  <div className="mt-3">
                    <Field label="Number of Trophies">
                      <div className="flex h-[43px] items-center justify-between rounded-[10px] border border-[#e8e0dd] bg-white px-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateField(
                              "trophyCount",
                              Math.max(1, Number(form.trophyCount) - 1)
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f7f3f1] text-[17px] text-[#983530] hover:bg-[#f0e6e3]"
                        >
                          −
                        </button>

                        <span className="text-[13px] font-bold text-[#302825]">
                          {form.trophyCount}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateField(
                              "trophyCount",
                              Math.min(100, Number(form.trophyCount) + 1)
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f7f3f1] text-[17px] text-[#983530] hover:bg-[#f0e6e3]"
                        >
                          +
                        </button>
                      </div>
                    </Field>
                  </div>
                )}
              </section>

              <div className="my-6 h-px bg-[#e9e2df]" />

              {/* PROPOSAL UPLOAD */}
              <section>
                <SectionHeading
                  number="05"
                  icon={FileText}
                  title="Event Proposal"
                  subtitle="Attach a proposal document if available."
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) =>
                    handleFile(e.target.files?.[0])
                  }
                />

                {!form.proposal ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleFile(e.dataTransfer.files?.[0]);
                    }}
                    className="group flex w-full flex-col items-center justify-center rounded-[13px] border-[1.5px] border-dashed border-[#d9cbc6] bg-white px-4 py-7 text-center transition-all hover:border-[#983530] hover:bg-[#fffafa]"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#983530]/[0.07] text-[#983530] transition-transform group-hover:-translate-y-1">
                      <UploadCloud size={21} strokeWidth={1.7} />
                    </div>

                    <p className="text-[12px] font-semibold text-[#413632]">
                      Click to upload proposal
                    </p>

                    <p className="mt-1 text-[10px] text-[#a39894]">
                      or drag and drop your file
                    </p>

                    <span className="mt-3 rounded-full bg-[#f8f2f0] px-3 py-1 text-[9px] font-semibold text-[#983530]">
                      PDF ONLY · MAX 10 MB
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center gap-3 rounded-[12px] border border-[#e4d9d5] bg-white p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#983530]/10 text-[#983530]">
                      <FileText size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold text-[#403632]">
                        {form.proposal.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#a39894]">
                        {formatFileSize(form.proposal.size)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      aria-label="Remove proposal"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#a59a96] transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )}

                {fileError && (
                  <p className="mt-2 text-[11px] font-medium text-red-600">
                    {fileError}
                  </p>
                )}
              </section>

              {/* INFO NOTE */}
              <div className="mt-6 flex items-start gap-2.5 rounded-[12px] border border-[#e8ded9] bg-[#f4eeeb] p-3.5">
                <Info
                  size={15}
                  className="mt-0.5 shrink-0 text-[#983530]"
                />
                <p className="text-[10px] leading-[1.8] text-[#76645f]">
                  Your event will be visible publicly only after
                  approval by the ECA team. You can save your
                  progress as a draft anytime.
                </p>
              </div>

            </aside>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="z-10 shrink-0 border-t border-[#eee8e6] bg-white px-5 py-3.5 sm:px-7 sm:py-4">

          {formError && (
            <div
              role="alert"
              className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-[11px] font-medium text-red-600"
            >
              {formError}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#edf7f0] text-[#308c50]">
                <CheckCircle2 size={15} />
              </div>

              <div>
                <p className="text-[11px] font-semibold text-[#514743]">
                  ECA Approval Required
                </p>
                <p className="text-[10px] text-[#a19793]">
                  Events are reviewed before publishing.
                </p>
              </div>
            </div>

            <div className="flex w-full items-center gap-2.5 sm:w-auto">

              {/* SAVE DRAFT */}
              <button
                type="button"
                onClick={() => handleAction("draft")}
                disabled={isSaving}
                className="flex h-[43px] flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#e5dcd8] bg-white px-4 text-[11px] font-semibold text-[#655551] transition-all hover:border-[#983530]/40 hover:bg-[#faf5f3] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-5"
              >
                <Save size={15} />
                Save as Draft
              </button>

              {/* SUBMIT FOR APPROVAL */}
              <button
                type="button"
                onClick={() => handleAction("submit")}
                disabled={isSaving}
                className="group flex h-[43px] flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#983530] px-4 text-[11px] font-semibold text-white shadow-[0_5px_15px_rgba(152,53,48,0.16)] transition-all hover:bg-[#7d2824] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-5"
              >
                <Send size={14} />
                {isSaving ? "Processing..." : "Submit for Approval"}
                {!isSaving && (
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>

            </div>
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default NewEventReigistration;
