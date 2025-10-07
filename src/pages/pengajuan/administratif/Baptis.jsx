import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Baptis() {
  const formRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [wijkValue, setWijkValue] = useState("");

  // Reveal-on-scroll anim
  useEffect(() => {
    const els = document.querySelectorAll(".will-animate");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const stepsCount = 2;

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
    if (validateStep(currentStep) && currentStep < stepsCount) {
      setCurrentStep((s) => s + 1);
    }
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
    setWijkValue("");
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/a5f3fc/ffffff?text=Baptis+Kudus')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white will-animate">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Pendaftaran Baptis</h1>
            <p className="mt-4 text-lg">Menyerahkan Anak dalam Persekutuan Tubuh Kristus</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-gray-100">
        <div className="mx-auto w-full max-w-2xl px-6">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl will-animate">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-primary">Formulir Pendaftaran</h2>
              <p className="text-gray-500 mt-2">Silakan lengkapi data anak dan orang tua/wali.</p>
              <div className="w-24 h-1 bg-accent mx-auto mt-4" />
            </div>

            <form ref={formRef} className="space-y-8" onSubmit={onSubmit} noValidate>
              {/* Step 1 */}
              <div className={`step ${currentStep === 1 ? "active" : "hidden"}`} data-step="1">
                <fieldset className="space-y-6">
                  <legend className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    Langkah 1: Data Anak
                  </legend>

                  <div>
                    <label htmlFor="nama_anak" className="block text-sm font-semibold text-gray-700 mb-1">
                      Nama Lengkap Anak
                    </label>
                    <input
                      type="text"
                      id="nama_anak"
                      name="nama_anak"
                      required
                      className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.nama_anak ? "invalid border-red-500" : ""}`}
                    />
                    {errors.nama_anak && <span className="error-message">{errors.nama_anak}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="tempat_lahir" className="block text-sm font-semibold text-gray-700 mb-1">
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        id="tempat_lahir"
                        name="tempat_lahir"
                        required
                        className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.tempat_lahir ? "invalid border-red-500" : ""}`}
                      />
                      {errors.tempat_lahir && <span className="error-message">{errors.tempat_lahir}</span>}
                    </div>
                    <div>
                      <label htmlFor="tanggal_lahir" className="block text-sm font-semibold text-gray-700 mb-1">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        id="tanggal_lahir"
                        name="tanggal_lahir"
                        required
                        className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.tanggal_lahir ? "invalid border-red-500" : ""}`}
                      />
                      {errors.tanggal_lahir && <span className="error-message">{errors.tanggal_lahir}</span>}
                    </div>
                  </div>

                  <div>
                    <span className="block text-sm font-semibold text-gray-700">Jenis Kelamin</span>
                    <div className="mt-2 flex space-x-6">
                      <label className="flex items-center">
                        <input
                          id="laki_laki"
                          name="jenis_kelamin"
                          type="radio"
                          value="Laki-laki"
                          defaultChecked
                          className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                        />
                        <span className="ml-3 text-sm text-gray-700">Laki-laki</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          id="perempuan"
                          name="jenis_kelamin"
                          type="radio"
                          value="Perempuan"
                          className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                        />
                        <span className="ml-3 text-sm text-gray-700">Perempuan</span>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* Step 2 */}
              <div className={`step ${currentStep === 2 ? "active" : "hidden"}`} data-step="2">
                <fieldset className="space-y-6">
                  <legend className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    Langkah 2: Data Orang Tua / Wali
                  </legend>

                  <div>
                    <label htmlFor="nama_ayah" className="block text-sm font-semibold text-gray-700 mb-1">
                      Nama Ayah
                    </label>
                    <input
                      type="text"
                      id="nama_ayah"
                      name="nama_ayah"
                      required
                      className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.nama_ayah ? "invalid border-red-500" : ""}`}
                    />
                    {errors.nama_ayah && <span className="error-message">{errors.nama_ayah}</span>}
                  </div>

                  <div>
                    <label htmlFor="nama_ibu" className="block text-sm font-semibold text-gray-700 mb-1">
                      Nama Ibu
                    </label>
                    <input
                      type="text"
                      id="nama_ibu"
                      name="nama_ibu"
                      required
                      className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.nama_ibu ? "invalid border-red-500" : ""}`}
                    />
                    {errors.nama_ibu && <span className="error-message">{errors.nama_ibu}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="telepon" className="block text-sm font-semibold text-gray-700 mb-1">
                        No. Telepon
                      </label>
                      <input
                        type="tel"
                        id="telepon"
                        name="telepon"
                        required
                        className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.telepon ? "invalid border-red-500" : ""}`}
                      />
                      {errors.telepon && <span className="error-message">{errors.telepon}</span>}
                    </div>
                    <div>
                      <label htmlFor="wijk" className="block text-sm font-semibold text-gray-700 mb-1">
                        Asal Wijk
                      </label>
                      <select
                        id="wijk"
                        name="wijk"
                        required
                        value={wijkValue}
                        onChange={(e) => setWijkValue(e.target.value)}
                        className={`form-input block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 ${errors.wijk ? "invalid border-red-500" : ""}`}
                      >
                        <option value="">Pilih Wijk</option>
                        <option value="1">Wijk 1</option>
                        <option value="2">Wijk 2</option>
                        <option value="3">Wijk 3</option>
                        <option value="4">Wijk 4</option>
                        <option value="5">Wijk 5</option>
                        <option value="6">Wijk 6</option>
                        <option value="7">Wijk 7</option>
                        <option value="8">Wijk 8</option>
                        <option value="9">Wijk Parserahan</option>
                      </select>
                      {errors.wijk && <span className="error-message">{errors.wijk}</span>}
                    </div>
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
            <div className="mt-4 text-gray-600">
              <p>
                Terima kasih, pendaftaran telah diterima. Untuk konfirmasi jadwal dan persiapan, harap hubungi
                Sintua <strong>Wijk {wijkValue || "-"}</strong>. Kontak dapat dilihat di{" "}
                <Link to="/peta-wilayah" className="text-primary font-bold hover:underline">
                  Peta Wilayah
                </Link>.
              </p>
            </div>
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
