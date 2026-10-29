
import React, { useState } from "react";
import {
  Building2,
  Camera,
  Check,
  Edit3,
  GraduationCap,
  Mail,
  Phone,
  Plus,
  Save,
  Target,
  Trash2,
  Users,
  X,
} from "lucide-react";

const initialData = {
  clubName: "CodeFiesta Club",
  college: "Swami Keshvanand Institute of Technology, Jaipur",
  description: "",
  aim: "",
  objectives: "",
  clubEmail: "",
  instagram: "",
  logo: "",
  studentCoordinators: [
    {
      id: 1,
      name: "",
      rollNo: "",
      year: "",
      collegeId: "",
      email: "",
      phone: "",
    },
    {
      id: 2,
      name: "",
      rollNo: "",
      year: "",
      collegeId: "",
      email: "",
      phone: "",
    },
  ],
  facultyCoordinators: [
    {
      id: 1,
      name: "",
      department: "",
      email: "",
    },
    {
      id: 2,
      name: "",
      department: "",
      email: "",
    },
  ],
};

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  editing = false,
}) => {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-[11px] font-semibold text-[#786B6B]">
        {label}
      </label>

      {editing ? (
        multiline ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full resize-y rounded-xl border border-[#E6DADA] bg-white px-3.5 py-3 text-[12px] text-[#332929] outline-none transition focus:border-[#900505]"
          />
        ) : (
          <input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="h-11 w-full rounded-xl border border-[#E6DADA] bg-white px-3.5 text-[12px] text-[#332929] outline-none transition focus:border-[#900505]"
          />
        )
      ) : (
        <div className="min-h-11 whitespace-pre-wrap break-words rounded-xl border border-[#F0EAEA] bg-[#FCFAFA] px-3.5 py-3 text-[12px] leading-6 text-[#443838]">
          {value || (
            <span className="italic text-[#B1A6A6]">
              Not added yet
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const SectionCard = ({
  title,
  subtitle,
  icon: Icon,
  editing,
  onEdit,
  onSave,
  onCancel,
  children,
}) => {
  return (
    <section className="overflow-hidden rounded-[18px] border border-[#EBE3E3] bg-white shadow-[0_4px_20px_rgba(80,20,20,0.025)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F1EAEA] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#900505]/[0.06] text-[#900505]">
            <Icon size={18} strokeWidth={1.8} />
          </div>

          <div>
            <h3 className="text-[13px] font-semibold text-[#332929]">
              {title}
            </h3>
            <p className="mt-0.5 text-[10px] text-[#A19595]">
              {subtitle}
            </p>
          </div>
        </div>

        {editing ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-1.5 rounded-lg border border-[#E9DEDE] px-3 py-2 text-[11px] font-medium text-[#766B6B] hover:bg-[#FAF6F6]"
            >
              <X size={13} />
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className="flex items-center gap-1.5 rounded-lg bg-[#900505] px-3 py-2 text-[11px] font-semibold text-white hover:bg-[#760404]"
            >
              <Save size={13} />
              Save
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-lg border border-[#900505]/15 bg-[#900505]/[0.04] px-3 py-2 text-[11px] font-semibold text-[#900505] transition hover:bg-[#900505]/10"
          >
            <Edit3 size={13} />
            Edit
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
};

const ClubInfoDashboard = () => {
  const [data, setData] = useState(initialData);
  const [draft, setDraft] = useState(initialData);
  const [editingSection, setEditingSection] = useState(null);

  const startEdit = (section) => {
    setDraft(structuredClone(data));
    setEditingSection(section);
  };

  const cancelEdit = () => {
    setDraft(structuredClone(data));
    setEditingSection(null);
  };

  const saveEdit = () => {
    setData(structuredClone(draft));
    setEditingSection(null);
  };

  const updateField = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCoordinator = (type, index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      [type]: prev[type].map((person, i) =>
        i === index ? { ...person, [field]: value } : person
      ),
    }));
  };

  const addCoordinator = (type) => {
    setDraft((prev) => ({
      ...prev,
      [type]: [
        ...prev[type],
        type === "studentCoordinators"
          ? {
              id: crypto.randomUUID(),
              name: "",
              rollNo: "",
              year: "",
              collegeId: "",
              email: "",
              phone: "",
            }
          : {
              id: crypto.randomUUID(),
              name: "",
              department: "",
              email: "",
            },
      ],
    }));
  };

  const removeCoordinator = (type, index) => {
    setDraft((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      window.alert("Please upload a PNG, JPG or WebP image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      window.alert("Logo size must be below 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateField("logo", reader.result);
    };

    reader.readAsDataURL(file);
  };

  const current = (section) =>
    editingSection === section ? draft : data;

  return (
    <div className="w-full space-y-6 pb-8">
      {/* PAGE HEADING */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#900505]">
            <Building2 size={13} />
            Club Management
          </div>

          <h1 className="text-[23px] font-semibold tracking-tight text-[#302525] sm:text-[27px]">
            Club Information
          </h1>

          <p className="mt-1 text-[12px] text-[#9A9090]">
            Manage your club profile, objectives and coordinator details.
          </p>
        </div>

        <div className="rounded-full border border-[#E9DEDE] bg-white px-3.5 py-2 text-[10px] font-medium text-[#827575]">
          SKIT • ECA Portal
        </div>
      </div>

      {/* CLUB PROFILE HEADER */}
      <section className="relative overflow-hidden rounded-[20px] bg-[#900505]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#650303] via-[#900505] to-[#B52C25]" />

        <div className="relative flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="flex h-[94px] w-[94px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-white/25 bg-white p-2 shadow-lg">
            {data.logo ? (
              <img
                src={data.logo}
                alt="Club logo"
                className="h-full w-full object-contain"
              />
            ) : (
              <Building2 size={35} className="text-[#900505]/50" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
              Official Club Profile
            </span>

            <h2 className="mt-2 text-[22px] font-semibold text-white sm:text-[26px]">
              {data.clubName}
            </h2>

            <p className="mt-1 max-w-xl text-[11px] leading-5 text-white/70">
              {data.college}
            </p>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white">
              <Check size={12} />
              Club Profile
            </div>
          </div>
        </div>
      </section>

      {/* BASIC DETAILS */}
      <SectionCard
        title="Club Profile"
        subtitle="Club identity, logo and contact details"
        icon={Building2}
        editing={editingSection === "profile"}
        onEdit={() => startEdit("profile")}
        onSave={saveEdit}
        onCancel={cancelEdit}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[150px_1fr]">
          <div>
            <p className="mb-2 text-[11px] font-semibold text-[#786B6B]">
              Club Logo
            </p>

            <div className="flex h-[135px] w-[135px] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#DCCACA] bg-[#FCFAFA]">
              {current("profile").logo ? (
                <img
                  src={current("profile").logo}
                  alt="Club logo preview"
                  className="h-full w-full object-contain p-3"
                />
              ) : (
                <Camera size={27} className="text-[#BDAAAA]" />
              )}
            </div>

            {editingSection === "profile" && (
              <label className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#900505]/[0.06] px-3 py-2 text-[10px] font-semibold text-[#900505]">
                <Camera size={13} />
                Upload Logo
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Club Name"
              value={current("profile").clubName}
              editing={editingSection === "profile"}
              onChange={(v) => updateField("clubName", v)}
              placeholder="Enter club name"
            />

            <Field
              label="College"
              value={current("profile").college}
              editing={editingSection === "profile"}
              onChange={(v) => updateField("college", v)}
              placeholder="College name"
            />

            <Field
              label="Official Club Email"
              value={current("profile").clubEmail}
              editing={editingSection === "profile"}
              onChange={(v) => updateField("clubEmail", v)}
              placeholder="club@skit.ac.in"
            />

            <Field
              label="Instagram / Social Link"
              value={current("profile").instagram}
              editing={editingSection === "profile"}
              onChange={(v) => updateField("instagram", v)}
              placeholder="Enter club social link"
            />
          </div>
        </div>
      </SectionCard>

      {/* ABOUT CLUB */}
      <SectionCard
        title="About the Club"
        subtitle="Introduction and club description"
        icon={Building2}
        editing={editingSection === "about"}
        onEdit={() => startEdit("about")}
        onSave={saveEdit}
        onCancel={cancelEdit}
      >
        <Field
          label="Club Description"
          value={current("about").description}
          editing={editingSection === "about"}
          onChange={(v) => updateField("description", v)}
          placeholder="Write about your club, its activities, background and purpose..."
          multiline
        />
      </SectionCard>

      {/* AIM AND OBJECTIVES */}
      <SectionCard
        title="Aim & Objectives"
        subtitle="Club vision, goals and purpose"
        icon={Target}
        editing={editingSection === "aim"}
        onEdit={() => startEdit("aim")}
        onSave={saveEdit}
        onCancel={cancelEdit}
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Field
            label="Club Aim"
            value={current("aim").aim}
            editing={editingSection === "aim"}
            onChange={(v) => updateField("aim", v)}
            placeholder="What does your club aim to achieve?"
            multiline
          />

          <Field
            label="Club Objectives"
            value={current("aim").objectives}
            editing={editingSection === "aim"}
            onChange={(v) => updateField("objectives", v)}
            placeholder="Mention the main objectives of your club..."
            multiline
          />
        </div>
      </SectionCard>

      {/* STUDENT COORDINATORS */}
      <SectionCard
        title="Student Coordinators"
        subtitle="Student leadership and coordinator records"
        icon={Users}
        editing={editingSection === "students"}
        onEdit={() => startEdit("students")}
        onSave={saveEdit}
        onCancel={cancelEdit}
      >
        <div className="space-y-4">
          {current("students").studentCoordinators.map((person, index) => (
            <div
              key={person.id}
              className="rounded-[15px] border border-[#EDE5E5] bg-[#FDFBFB] p-4 sm:p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#900505]/[0.06] text-[#900505]">
                    <GraduationCap size={17} />
                  </div>

                  <div>
                    <h4 className="text-[12px] font-semibold text-[#3D3030]">
                      Student Coordinator {index + 1}
                    </h4>
                    <p className="mt-0.5 text-[10px] text-[#A19595]">
                      Coordinator information
                    </p>
                  </div>
                </div>

                {editingSection === "students" && (
                  <button
                    type="button"
                    onClick={() =>
                      removeCoordinator("studentCoordinators", index)
                    }
                    className="rounded-lg p-2 text-[#A98B8B] hover:bg-red-50 hover:text-red-600"
                    title="Remove coordinator"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["name", "Full Name", "Student full name"],
                  ["rollNo", "University Roll Number", "Roll number"],
                  ["year", "Year of Study", "e.g. 3rd Year"],
                  ["collegeId", "College ID", "College ID"],
                  ["email", "College Email", "student@skit.ac.in"],
                  ["phone", "Mobile Number", "Contact number"],
                ].map(([field, label, placeholder]) => (
                  <Field
                    key={field}
                    label={label}
                    value={person[field]}
                    editing={editingSection === "students"}
                    onChange={(v) =>
                      updateCoordinator(
                        "studentCoordinators",
                        index,
                        field,
                        v
                      )
                    }
                    placeholder={placeholder}
                  />
                ))}
              </div>
            </div>
          ))}

          {editingSection === "students" && (
            <button
              type="button"
              onClick={() => addCoordinator("studentCoordinators")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#D9BDBD] bg-[#900505]/[0.025] py-3 text-[11px] font-semibold text-[#900505] hover:bg-[#900505]/[0.06]"
            >
              <Plus size={15} />
              Add Student Coordinator
            </button>
          )}
        </div>
      </SectionCard>

      {/* FACULTY COORDINATORS */}
      <SectionCard
        title="Faculty Coordinators"
        subtitle="Faculty mentors and departmental details"
        icon={GraduationCap}
        editing={editingSection === "faculty"}
        onEdit={() => startEdit("faculty")}
        onSave={saveEdit}
        onCancel={cancelEdit}
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {current("faculty").facultyCoordinators.map((person, index) => (
            <div
              key={person.id}
              className="rounded-[15px] border border-[#EDE5E5] bg-[#FDFBFB] p-4 sm:p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#900505]/[0.06] text-[#900505]">
                    <Users size={17} />
                  </div>

                  <h4 className="text-[12px] font-semibold text-[#3D3030]">
                    Faculty Coordinator {index + 1}
                  </h4>
                </div>

                {editingSection === "faculty" && (
                  <button
                    type="button"
                    onClick={() =>
                      removeCoordinator("facultyCoordinators", index)
                    }
                    className="rounded-lg p-2 text-[#A98B8B] hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {[
                  ["name", "Faculty Name", "Faculty full name"],
                  ["department", "Department", "e.g. Computer Science"],
                  ["email", "Official Email", "faculty@skit.ac.in"],
                ].map(([field, label, placeholder]) => (
                  <Field
                    key={field}
                    label={label}
                    value={person[field]}
                    editing={editingSection === "faculty"}
                    onChange={(v) =>
                      updateCoordinator(
                        "facultyCoordinators",
                        index,
                        field,
                        v
                      )
                    }
                    placeholder={placeholder}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {editingSection === "faculty" && (
          <button
            type="button"
            onClick={() => addCoordinator("facultyCoordinators")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#D9BDBD] bg-[#900505]/[0.025] py-3 text-[11px] font-semibold text-[#900505] hover:bg-[#900505]/[0.06]"
          >
            <Plus size={15} />
            Add Faculty Coordinator
          </button>
        )}
      </SectionCard>

      {/* FOOTER */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="text-[10px] leading-5 text-[#A19595]">
          Club profile information is managed through the Orbix ECA Portal.
        </p>

        <span className="text-[10px] font-medium text-[#900505]">
          CodeFiesta Club • SKIT Jaipur
        </span>
      </div>
    </div>
  );
};

export default ClubInfoDashboard;
