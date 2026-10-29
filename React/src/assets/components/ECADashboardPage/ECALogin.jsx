import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { ShieldCheck, LockKeyhole, Loader2 } from "lucide-react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const ECALogin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (response) => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${API_URL}/auth/eca/google`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: response.code,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "ECA authentication failed"
          );
        }

        if (data.role !== "eca_admin") {
          throw new Error("Unauthorized ECA account");
        }

        navigate("/eca/dashboard", {
          replace: true,
        });
      } catch (err) {
        setError(err.message || "Unable to log in");
      } finally {
        setLoading(false);
      }
    },

    onError: () => {
      setLoading(false);
      setError("Google login failed. Please try again.");
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F8FA] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[430px] overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-xl shadow-gray-200/60">

        {/* Header */}
        <div className="bg-[#900505] px-8 py-9 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 border border-white/20">
            <ShieldCheck size={29} className="text-white" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            ORBIX
          </h1>

          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[2px] text-red-100">
            ECA Administration
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-9">
          <h2 className="text-xl font-bold text-gray-900">
            Administrator Login
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Sign in using your authorized SKIT Google
            account to access the ECA administration portal.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setError("");
              login();
            }}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#900505] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#760404] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Verifying account...
              </>
            ) : (
              <>
                <LockKeyhole size={18} />
                Continue with Google
              </>
            )}
          </button>

          <div className="mt-7 border-t border-gray-100 pt-5 text-center">
            <p className="text-xs leading-5 text-gray-400">
              Restricted access · Authorized ECA personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECALogin;