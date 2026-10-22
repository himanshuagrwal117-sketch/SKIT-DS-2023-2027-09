
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const EventRegistrationPopup = ({ isOpen, onClose, event }) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[8px] sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Register for ${event?.name || "Event"}`}
        className="relative flex h-[min(680px,90dvh)] w-full max-w-[1100px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_25px_100px_rgba(0,0,0,0.3)]"
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close registration popup"
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f1f0] text-[#781f1b] transition-all duration-200 hover:rotate-90 hover:bg-[#781f1b] hover:text-white"
        >
          <X size={19} strokeWidth={2} />
        </button>

        {/* POPUP HEADER */}
        <div className="shrink-0 border-b border-black/5 px-8 py-6 pr-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#983530]">
            Event Registration
          </p>

          <h2 className="mt-1 text-[26px] font-semibold tracking-tight text-[#242424]">
            {event?.name || "Event Name"}
          </h2>

          <p className="mt-1 text-[13px] text-[#888]">
            Organized by {event?.club || "Club Name"}
          </p>
        </div>

        {/* REGISTRATION CONTENT AREA */}
        <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6">
          {/* Registration form UI will be added here */}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EventRegistrationPopup;
