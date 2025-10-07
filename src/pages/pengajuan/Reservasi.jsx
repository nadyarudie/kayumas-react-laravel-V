import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const initialForm = {
  // Step 1
  nama: "",
  telepon: "",
  email: "",
  status_jemaat: "non_jemaat", // "jemaat" | "non_jemaat"
  no_registrasi: "",
  wijk: "",
  // Step 2
  ruangan: "Gedung Serbaguna",
  tanggal: "",
  waktu: "",
  tujuan: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Reservasi() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Animasi “will-animate”
  useEffect(() => {
    const els = document.querySelectorAll(".will-animate");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const isJemaat = form.status_jemaat === "jemaat";

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((f) => ({ ...f, [name]: type === "radio" ? value : value }));
    // bersihkan error saat pengguna mengetik
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const requiredStep1 = useMemo(() => {
    const base = ["nama", "telepon", "email"];
    return isJemaat ? [...base, "no_registrasi", "wijk"] : base;
  }, [isJemaat]);

  const requiredStep2 = ["ruangan", "tanggal", "waktu", "tujuan"];

  const validate = (names) => {
    const nextErrors = {};
    names.forEach((n) => {
      const v = (form[n] ?? "").toString().trim();
      if (!v) {
        nextErrors[n] = "Wajib diisi.";
      } else if (n === "email" && !emailRegex.test(v)) {
        nextErrors[n] = "Format email tidak valid.";
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (step === 1 && validate(requiredStep1)) setStep(2);
    if (step === 2 && validate(requiredStep2)) {
      // valid; submit
      setShowModal(true);
    }
  };

  const goPrev = () => setStep((s) => Math.max(1, s - 1));

  const closeModal = () => {
    setShowModal(false);
    setForm(initialForm);
    setErrors({});
    setStep(1);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/a5b4fc/ffffff?text=Reservasi')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white will-animate opacity-0 translate-y-10 transition duration-700">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">
              Reservasi Fasilitas
            </h1>
            <p className="mt-4 text-lg">
              Jadwalkan Penggunaan Fasilitas Gereja dengan Mudah
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-gray-100">
        <div className="mx-auto w-full max-w-2xl px-6">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl will-animate opacity-0 translate-y-10 transition duration-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Formulir Pengajuan Reservasi
              </h2>
              <p className="text-gray-500 mt-2">
                Silakan lengkapi data di bawah ini untuk memulai proses
                reservasi.
              </p>
            </div>

            {/* Stepper indicator (sederhana) */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-2 w-24 rounded-full ${
                    step >= i ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <fieldset className="space-y-6">
                  <legend className="text-xl font-semibold text-gray-800 mb-2">
                    Langkah 1: Identitas Pemohon
                  </legend>

                  {/* Nama */}
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      id="nama"
                      name="nama"
                      type="text"
                      value={form.nama}
                      onChange={handleChange}
                      className={`form-input block w-full border rounded-md shadow-sm py-2 px-3 ${
                        errors.nama ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.nama && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nama}
                      </p>
                    )}
                  </div>

                  {/* Telepon + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="telepon"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        No. Telepon
                      </label>
                      <input
                        id="telepon"
                        name="telepon"
                        type="tel"
                        value={form.telepon}
                        onChange={handleChange}
                        className={`form-input block w-full border rounded-md shadow-sm py-2 px-3 ${
                          errors.telepon ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.telepon && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.telepon}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`form-input block w-full border rounded-md shadow-sm py-2 px-3 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <span className="block text-sm font-semibold text-gray-700">
                      Status
                    </span>
                    <div className="mt-2 flex gap-6">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="status_jemaat"
                          value="jemaat"
                          checked={isJemaat}
                          onChange={handleChange}
                          className="text-primary"
                        />
                        <span>Jemaat</span>
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="status_jemaat"
                          value="non_jemaat"
                          checked={!isJemaat}
                          onChange={handleChange}
                          className="text-primary"
                        />
                        <span>Bukan Jemaat</span>
                      </label>
                    </div>
                  </div>

                  {/* Info Jemaat (conditional) */}
                  {isJemaat && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="no_registrasi"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                          >
                            No. Registrasi
                          </label>
                          <input
                            id="no_registrasi"
                            name="no_registrasi"
                            type="text"
                            value={form.no_registrasi}
                            onChange={handleChange}
                            className={`form-input block w-full border rounded-md shadow-sm py-2 px-3 ${
                              errors.no_registrasi
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.no_registrasi && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.no_registrasi}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="wijk"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                          >
                            Asal Wijk
                          </label>
                          <select
                            id="wijk"
                            name="wijk"
                            value={form.wijk}
                            onChange={handleChange}
                            className={`form-input block w-full border rounded-md shadow-sm py-2 px-3 ${
                              errors.wijk ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Pilih Wijk</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => (
                              <option key={w} value={w}>
                                Wijk {w}
                              </option>
                            ))}
                            <option value="9">Wijk Parserahan</option>
                          </select>
                          {errors.wijk && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.wijk}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </fieldset>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <fieldset className="space-y-6">
                  <legend className="text-xl font-semibold text-gray-800 mb-2">
                    Langkah 2: Detail Reservasi
                  </legend>

                  <div>
                    <label
                      htmlFor="ruangan"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Fasilitas
                    </label>
                    <select
                      id="ruangan"
                      name="ruangan"
                      value={form.ruangan}
                      onChange={handleChange}
                      className={`form-input block w-full border rounded-md shadow-sm py-2 px-3 ${
                        errors.ruangan ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option>Gedung Serbaguna</option>
                      <option>Ruang Rapat</option>
                      <option>Aula Sekolah Minggu</option>
                    </select>
                    {errors.ruangan && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.ruangan}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="tanggal"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Tanggal
                      </label>
                      <input
                        id="tanggal"
                        name="tanggal"
                        type="date"
                        value={form.tanggal}
                        onChange={handleChange}
                        className={`form-input block w-full border rounded-md shadow-sm py-2 px-3 ${
                          errors.tanggal ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.tanggal && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.tanggal}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="waktu"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Waktu
                      </label>
                      <input
                        id="waktu"
                        name="waktu"
                        type="text"
                        placeholder="Contoh: 14:00 - 17:00"
                        value={form.waktu}
                        onChange={handleChange}
                        className={`form-input block w-full border rounded-md shadow-sm py-2 px-3 ${
                          errors.waktu ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.waktu && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.waktu}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="tujuan"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Tujuan Reservasi
                    </label>
                    <textarea
                      id="tujuan"
                      name="tujuan"
                      rows={3}
                      value={form.tujuan}
                      onChange={handleChange}
                      className={`form-input block w-full border rounded-md shadow-sm py-2 px-3 ${
                        errors.tujuan ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.tujuan && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.tujuan}
                      </p>
                    )}
                  </div>
                </fieldset>
              </div>
            )}

            {/* Navigation */}
            <div className="pt-6 flex flex-col sm:flex-row gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goPrev}
                  className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Kembali
                </button>
              ) : (
                <span />
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="sm:ml-auto py-2 px-6 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-primary hover:bg-blue-900"
                >
                  Selanjutnya
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  className="w-full sm:w-auto sm:ml-auto py-3 px-6 border border-transparent rounded-md shadow-lg text-base font-bold text-white bg-primary hover:bg-blue-900"
                >
                  Kirim Pengajuan
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal sukses */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold font-serif text-gray-900">
              Pengajuan Berhasil Dikirim!
            </h3>

            <div className="mt-4 text-gray-600 text-left space-y-3">
              <p>
                Terima kasih, <span className="font-semibold">{form.nama || "Jemaat"}</span>.
                Tim kami akan melakukan konfirmasi melalui{" "}
                <span className="font-semibold">{form.email || "-"}</span> /
                <span className="font-semibold"> {form.telepon || "-"}</span>.
              </p>

              {isJemaat ? (
                <p>
                  Untuk konfirmasi lebih lanjut, harap hubungi sintua sesuai{" "}
                  <span className="font-semibold">
                    {form.wijk ? `Wijk ${form.wijk}` : "Wijk Anda"}
                  </span>{" "}
                  yang dapat dicek di{" "}
                  <a
                    href="/peta-wilayah"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-bold hover:underline"
                  >
                    Peta Wilayah
                  </a>
                  .
                </p>
              ) : (
                <p>
                  Untuk konfirmasi lebih lanjut, silakan hubungi salah satu sintua
                  (lihat daftar pada{" "}
                  <a
                    href="/peta-wilayah"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-bold hover:underline"
                  >
                    Peta Wilayah
                  </a>
                  ).
                </p>
              )}

              <div className="rounded-md bg-indigo-50 p-3">
                <div className="text-sm">
                  <div>
                    <span className="font-semibold">Fasilitas:</span> {form.ruangan}
                  </div>
                  <div>
                    <span className="font-semibold">Tanggal:</span>{" "}
                    {form.tanggal || "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Waktu:</span>{" "}
                    {form.waktu || "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Tujuan:</span>{" "}
                    {form.tujuan || "-"}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={closeModal}
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
