import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Menikah() {
  const formRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".will-animate");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const stepsCount = 3;

  const validateStep = (stepNumber) => {
    const form = formRef.current;
    const thisStep = form.querySelector(`.step[data-step="${stepNumber}"]`);
    const reqs = thisStep.querySelectorAll("[required]");
    const newErrors = {};
    reqs.forEach((field) => {
      const name = field.name || field.id;
      const value = (field.value || "").trim();
      if (!value) {
        newErrors[name] = `${field.previousElementSibling?.textContent || "Field"} wajib diisi.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep(currentStep) && currentStep < stepsCount) setCurrentStep((s) => s + 1);
  };
  const prev = () => setCurrentStep((s) => Math.max(1, s - 1));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    setShowModal(true);
  };

  const resetAll = () => {
    formRef.current?.reset();
    setErrors({});
    setCurrentStep(1);
    setShowModal(false);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/fda4af/ffffff?text=Pernikahan+Kudus')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white will-animate">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Pemberkatan Nikah</h1>
            <p className="mt-4 text-lg">Mengikat Janji Suci di Hadapan Tuhan</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-gray-100">
        <div className="mx-auto w-full max-w-2xl px-6">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl will-animate">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-primary">Formulir Pendaftaran</h2>
              <p className="text-gray-500 mt-2">
                Lengkapi data kedua calon mempelai dan rencana pemberkatan.
              </p>
              <div className="w-24 h-1 bg-accent mx-auto mt-4" />
            </div>

            <form ref={formRef} className="space-y-8" onSubmit={onSubmit} noValidate>
              {/* Step 1 */}
              <div className={`step ${currentStep === 1 ? "active" : "hidden"}`} data-step="1">
                <fieldset className="space-y-6">
                  <legend className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    Langkah 1: Data Calon Mempelai Pria
                  </legend>
                  <div>
                    <label htmlFor="nama_pria" className="block text-sm font-semibold text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="nama_pria"
                      name="nama_pria"
                      required
                      className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.nama_pria ? "invalid border-red-500" : ""}`}
                    />
                    {errors.nama_pria && <span className="error-message">{errors.nama_pria}</span>}
                  </div>
                </fieldset>
              </div>

              {/* Step 2 */}
              <div className={`step ${currentStep === 2 ? "active" : "hidden"}`} data-step="2">
                <fieldset className="space-y-6">
                  <legend className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    Langkah 2: Data Calon Mempelai Wanita
                  </legend>
                  <div>
                    <label htmlFor="nama_wanita" className="block text-sm font-semibold text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="nama_wanita"
                      name="nama_wanita"
                      required
                      className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.nama_wanita ? "invalid border-red-500" : ""}`}
                    />
                    {errors.nama_wanita && <span className="error-message">{errors.nama_wanita}</span>}
                  </div>
                </fieldset>
              </div>

              {/* Step 3 */}
              <div className={`step ${currentStep === 3 ? "active" : "hidden"}`} data-step="3">
                <fieldset className="space-y-6">
                  <legend className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    Langkah 3: Rencana Pemberkatan
                  </legend>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="tanggal_nikah" className="block text-sm font-semibold text-gray-700 mb-1">
                        Rencana Tanggal
                      </label>
                      <input
                        type="date"
                        id="tanggal_nikah"
                        name="tanggal_nikah"
                        required
                        className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.tanggal_nikah ? "invalid border-red-500" : ""}`}
                      />
                      {errors.tanggal_nikah && <span className="error-message">{errors.tanggal_nikah}</span>}
                    </div>
                    <div>
                      <label htmlFor="waktu_nikah" className="block text-sm font-semibold text-gray-700 mb-1">
                        Rencana Waktu
                      </label>
                      <input
                        type="time"
                        id="waktu_nikah"
                        name="waktu_nikah"
                        required
                        className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.waktu_nikah ? "invalid border-red-500" : ""}`}
                      />
                      {errors.waktu_nikah && <span className="error-message">{errors.waktu_nikah}</span>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telepon_cp" className="block text-sm font-semibold text-gray-700 mb-1">
                      No. Telepon Kontak
                    </label>
                    <input
                      type="tel"
                      id="telepon_cp"
                      name="telepon_cp"
                      required
                      className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.telepon_cp ? "invalid border-red-500" : ""}`}
                    />
                    {errors.telepon_cp && <span className="error-message">{errors.telepon_cp}</span>}
                  </div>
                </fieldset>
              </div>

              {/* Nav Buttons */}
              <div className="pt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prev}
                  className={`${currentStep === 1 ? "hidden" : ""} py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50`}
                >
                  Kembali
                </button>

                {currentStep < stepsCount ? (
                  <button
                    type="button"
                    onClick={next}
                    className="ml-auto py-2 px-6 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-primary hover:bg-blue-900"
                  >
                    Selanjutnya
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-bold text-white bg-primary hover:bg-blue-900"
                  >
                    Kirim Pendaftaran
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6">
              <Link to="/pengajuan/administratif" className="text-sm font-semibold text-primary hover:underline">
                &larr; Kembali ke Layanan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold font-serif text-gray-900">Pendaftaran Terkirim!</h3>
            <p className="mt-4 text-gray-600">
              Terima kasih, pendaftaran Anda akan segera diproses. Selanjutnya, silakan hubungi sekretariat
              gereja untuk konsultasi dan persiapan.
            </p>
            <button
              onClick={resetAll}
              className="mt-8 w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-900"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
