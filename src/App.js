import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Lock,
  Unlock,
  CheckCircle,
  Circle,
  Search,
  BookOpen,
  Trophy,
  Star,
  Download,
  Upload,
} from "lucide-react";
import "./App.css";

function App() {
  const [subjectStatus, setSubjectStatus] = useState(() => {
    const saved = localStorage.getItem("subjectStatus");
    return saved ? JSON.parse(saved) : {};
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("subjectStatus", JSON.stringify(subjectStatus));
  }, [subjectStatus]);

  const subjects = useMemo(
    () => [
      // Semestre 1
      {
        id: 2103,
        name: "Álgebra lineal",
        semester: 1,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 7660,
        name: "Cálculo en una variable",
        semester: 1,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 1479,
        name: "Programación 1",
        semester: 1,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 7687,
        name: "Taller de tecnologías 1",
        semester: 1,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },

      // Semestre 2
      {
        id: 7670,
        name: "Fundamentos de sistemas ciberfísicos",
        semester: 2,
        credits: 1,
        standing: 0,
        depsPartial: [7660],
        depsTotal: [],
      },
      {
        id: 6449,
        name: "Fundamentos de computación",
        semester: 2,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 6580,
        name: "Matemática discreta",
        semester: 2,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 1743,
        name: "Programación 2",
        semester: 2,
        credits: 1,
        standing: 0,
        depsPartial: [1479],
        depsTotal: [],
      },

      // Semestre 3
      {
        id: 3831,
        name: "Arquitectura de sistemas",
        semester: 3,
        credits: 1,
        standing: 2,
        depsPartial: [],
        depsTotal: [],
      },
      {
        id: 1774,
        name: "Estructuras de datos y algoritmos 1",
        semester: 3,
        credits: 1,
        standing: 2,
        depsPartial: [1743, 6449],
        depsTotal: [],
      },
      {
        id: 6563,
        name: "Lógica para computación",
        semester: 3,
        credits: 1,
        standing: 2,
        depsPartial: [6449],
        depsTotal: [],
      },
      {
        id: 1780,
        name: "Probabilidad y estadística",
        semester: 3,
        credits: 1,
        standing: 2,
        depsPartial: [],
        depsTotal: [2103, 7660],
      },

      // Semestre 4
      {
        id: "m4",
        name: "Optimización con Álgebra",
        semester: 4,
        credits: 1,
        standing: 6,
        depsPartial: [],
        depsTotal: [2103, 7660],
      },
      {
        id: 3837,
        name: "Bases de datos 1",
        semester: 4,
        credits: 1,
        standing: 6,
        depsPartial: [1743],
        depsTotal: [],
      },
      {
        id: 1778,
        name: "Estructuras de datos y algoritmos 2",
        semester: 4,
        credits: 1,
        standing: 6,
        depsPartial: [1774, 6580],
        depsTotal: [],
      },
      {
        id: 7669,
        name: "Fundamentos de Ingeniería de software",
        semester: 4,
        credits: 1,
        standing: 6,
        depsPartial: [1743],
        depsTotal: [],
      },
      {
        id: 6409,
        name: "Sistemas operativos",
        semester: 4,
        credits: 1,
        standing: 6,
        depsPartial: [3831],
        depsTotal: [],
      },

      // Semestre 5
      {
        id: "cs5",
        name: "Materia de Ciencias sociales",
        semester: 5,
        credits: 1,
        standing: 9,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },
      {
        id: 3839,
        name: "Bases de datos 2",
        semester: 5,
        credits: 1,
        standing: 9,
        depsPartial: [3837, 6563],
        depsTotal: [],
      },
      {
        id: 3924,
        name: "Diseño de aplicaciones 1",
        semester: 5,
        credits: 1,
        standing: 9,
        depsPartial: [3837, 7669],
        depsTotal: [1774],
      },
      {
        id: 3838,
        name: "Redes",
        semester: 5,
        credits: 1,
        standing: 9,
        depsPartial: [6409],
        depsTotal: [],
      },
      {
        id: 6452,
        name: "Teoría de la computación",
        semester: 5,
        credits: 1,
        standing: 9,
        depsPartial: [1774, 6563],
        depsTotal: [],
      },

      // Semestre 5.5
      {
        id: "cn55",
        name: "Materia de Comunicación y negociación",
        semester: 5.5,
        credits: 1,
        standing: 12,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },

      // Semestre 6
      {
        id: "si6",
        name: "Materia de Sistemas inteligentes",
        semester: 6,
        credits: 1,
        standing: 12,
        depsPartial: [],
        depsTotal: [1774, 1780],
        type: "elective",
      },
      {
        id: 6343,
        name: "Diseño de aplicaciones 2",
        semester: 6,
        credits: 1,
        standing: 12,
        depsPartial: [3924, 7669],
        depsTotal: [],
      },
      {
        id: 7674,
        name: "Ingeniería de software ágil 1",
        semester: 6,
        credits: 1,
        standing: 12,
        depsPartial: [3924, 7669],
        depsTotal: [],
      },
      {
        id: 6498,
        name: "Programación de redes",
        semester: 6,
        credits: 1,
        standing: 12,
        depsPartial: [3924, 6409],
        depsTotal: [],
      },
      {
        id: 7688,
        name: "Taller de tecnologías 2",
        semester: 6,
        credits: 1,
        standing: 12,
        depsPartial: [3838, 3924, 7670],
        depsTotal: [1778, 3837, 7687],
      },

      // Semestre 7
      {
        id: "gi7",
        name: "Materia de Gestión de la información",
        semester: 7,
        credits: 1,
        standing: 16,
        depsPartial: [],
        depsTotal: [3839],
        type: "elective",
      },
      {
        id: "seg7",
        name: "Materia de Seguridad informática",
        semester: 7,
        credits: 1,
        standing: 16,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },
      {
        id: 3851,
        name: "Arquitectura de software",
        semester: 7,
        credits: 1,
        standing: 16,
        depsPartial: [6343, 6498],
        depsTotal: [1778, 3839],
      },
      {
        id: 7675,
        name: "Ingeniería de software ágil 2",
        semester: 7,
        credits: 1,
        standing: 16,
        depsPartial: [6343, 6498, 7674],
        depsTotal: [3924],
      },
      {
        id: 3876,
        name: "Inteligencia artificial",
        semester: 7,
        credits: 1,
        standing: 16,
        depsPartial: [1778, 1780, 6563],
        depsTotal: [],
      },

      // Semestre 7.5
      {
        id: "ie75",
        name: "Materia de Innovación y emprendedurismo",
        semester: 7.5,
        credits: 1,
        standing: 16,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },

      // Semestre 8
      {
        id: "alp8",
        name: "Materia de Algoritmos y lenguajes",
        semester: 8,
        credits: 1,
        standing: 20,
        depsPartial: [],
        depsTotal: [1778],
        type: "elective",
      },
      {
        id: "ips8",
        name: "Materia de Ingeniería de productos de software",
        semester: 8,
        credits: 1,
        standing: 20,
        depsPartial: [7674],
        depsTotal: [3924],
        type: "elective",
      },
      {
        id: "nt8",
        name: "Materia de Nuevas tecnologías",
        semester: 8,
        credits: 1,
        standing: 20,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },
      {
        id: 6455,
        name: "Arquitectura de software en la práctica",
        semester: 8,
        credits: 1,
        standing: 20,
        depsPartial: [3851, 6498, 7675],
        depsTotal: [],
      },
      {
        id: 6435,
        name: "Trabajo integrador",
        semester: 8,
        credits: 1,
        standing: 20,
        depsPartial: [6343, 6452, 6498, 7674],
        depsTotal: [3839],
      },

      // Semestre 9
      {
        id: "e91",
        name: "Electiva 1",
        semester: 9,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },
      {
        id: "cn9",
        name: "Materia de Comunicación y negociación",
        semester: 9,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },
      {
        id: 1798,
        name: "Proyecto",
        semester: 9,
        credits: 1,
        standing: 30,
        depsPartial: [3851, 3876, 7675],
        depsTotal: [7688, 6435],
      },

      // Semestre 10
      {
        id: "e102",
        name: "Electiva 2",
        semester: 10,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },
      {
        id: "e103",
        name: "Electiva 3",
        semester: 10,
        credits: 1,
        standing: 0,
        depsPartial: [],
        depsTotal: [],
        type: "elective",
      },
    ],
    [],
  );

  const getTotalCredits = useCallback(() => {
    return subjects.reduce((total, subject) => {
      const status = subjectStatus[subject.id];
      if (status === "total" || status === "partial") {
        return total + subject.credits;
      }
      return total;
    }, 0);
  }, [subjects, subjectStatus]);

  const toggleSubject = (id) => {
    setSubjectStatus((prev) => {
      const current = prev[id];
      const newStatus = { ...prev };

      if (!current) {
        newStatus[id] = "partial";
      } else if (current === "partial") {
        newStatus[id] = "total";
      } else {
        delete newStatus[id];
      }

      return newStatus;
    });
  };

  const isUnlocked = useCallback(
    (subject) => {
      const totalCredits = getTotalCredits();
      if (totalCredits < subject.standing) return false;
      for (const depId of subject.depsPartial) {
        if (!subjectStatus[depId]) return false;
      }
      for (const depId of subject.depsTotal) {
        if (subjectStatus[depId] !== "total") return false;
      }
      return true;
    },
    [subjectStatus, getTotalCredits],
  );

  const getSubjectDisplayStatus = useCallback(
    (subject) => {
      const status = subjectStatus[subject.id];
      if (status) return status;
      if (isUnlocked(subject)) return "unlocked";
      return "locked";
    },
    [subjectStatus, isUnlocked],
  );

  const exportProgress = () => {
    const data = JSON.stringify(subjectStatus, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `progreso-materias-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  const importProgress = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setSubjectStatus(data);
        alert("¡Progreso importado exitosamente!");
      } catch (error) {
        alert("Error al importar el archivo");
      }
    };
    reader.readAsText(file);
  };

  const resetProgress = () => {
    if (
      window.confirm("¿Estás seguro de que querés borrar todo el progreso?")
    ) {
      setSubjectStatus({});
      localStorage.removeItem("subjectStatus");
    }
  };

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch = subject.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const displayStatus = getSubjectDisplayStatus(subject);

      if (filterStatus === "all") return matchesSearch;
      if (filterStatus === "unlocked")
        return matchesSearch && displayStatus === "unlocked";
      if (filterStatus === "locked")
        return matchesSearch && displayStatus === "locked";
      return (
        matchesSearch &&
        (displayStatus === "partial" || displayStatus === "total")
      );
    });
  }, [subjects, searchTerm, filterStatus, getSubjectDisplayStatus]);

  const groupedSubjects = useMemo(() => {
    const groups = {};
    filteredSubjects.forEach((subject) => {
      const key = `Semestre ${subject.semester}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(subject);
    });
    return groups;
  }, [filteredSubjects]);

  const stats = useMemo(() => {
    const total = subjects.length;
    const completed = Object.values(subjectStatus).filter(
      (s) => s === "total",
    ).length;
    const partial = Object.values(subjectStatus).filter(
      (s) => s === "partial",
    ).length;
    const unlocked = subjects.filter((s) => {
      const status = subjectStatus[s.id];
      return !status && isUnlocked(s);
    }).length;
    const locked = total - completed - partial - unlocked;
    const totalCredits = getTotalCredits();
    const progress = Math.round((completed / total) * 100);

    return {
      total,
      completed,
      partial,
      unlocked,
      locked,
      totalCredits,
      progress,
    };
  }, [subjects, subjectStatus, getTotalCredits, isUnlocked]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                Ingeniería en Sistemas
              </h1>
              <p className="text-indigo-200">
                Universidad ORT - Plan 2019 (2485)
              </p>
            </div>
            <Trophy className="text-yellow-400" size={48} />
          </div>
          <div className="mb-3">
            <div className="flex justify-between text-sm text-indigo-200 mb-1">
              <span>Progreso de la carrera</span>
              <span className="font-bold text-white">{stats.progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-yellow-300">
              <Star className="fill-yellow-300" size={20} />
              <span className="font-bold text-lg">
                {stats.totalCredits} créditos
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={exportProgress}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                <Download size={18} />
                Exportar
              </button>
              <label className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition cursor-pointer">
                <Upload size={18} />
                Importar
                <input
                  type="file"
                  accept=".json"
                  onChange={importProgress}
                  className="hidden"
                />
              </label>
              <button
                onClick={resetProgress}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-3 border border-green-400/30">
            <div className="text-green-300 text-xs mb-1">✅ Total</div>
            <div className="text-2xl font-bold text-white">
              {stats.completed}
            </div>
          </div>
          <div className="bg-yellow-500/20 backdrop-blur-lg rounded-xl p-3 border border-yellow-400/30">
            <div className="text-yellow-300 text-xs mb-1">⏳ Parcial</div>
            <div className="text-2xl font-bold text-white">{stats.partial}</div>
          </div>
          <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-3 border border-blue-400/30">
            <div className="text-blue-300 text-xs mb-1">🔓 Disponibles</div>
            <div className="text-2xl font-bold text-white">
              {stats.unlocked}
            </div>
          </div>
          <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-3 border border-red-400/30">
            <div className="text-red-300 text-xs mb-1">🔒 Bloqueadas</div>
            <div className="text-2xl font-bold text-white">{stats.locked}</div>
          </div>
          <div className="bg-purple-500/20 backdrop-blur-lg rounded-xl p-3 border border-purple-400/30">
            <div className="text-purple-300 text-xs mb-1">📚 Total</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-3 text-indigo-300"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar materia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar materia"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                  filterStatus === "all"
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 text-indigo-200 hover:bg-white/20"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterStatus("completed")}
                className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                  filterStatus === "completed"
                    ? "bg-green-500 text-white"
                    : "bg-white/10 text-green-200 hover:bg-white/20"
                }`}
              >
                Aprobadas
              </button>
              <button
                onClick={() => setFilterStatus("unlocked")}
                className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                  filterStatus === "unlocked"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-blue-200 hover:bg-white/20"
                }`}
              >
                Disponibles
              </button>
              <button
                onClick={() => setFilterStatus("locked")}
                className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                  filterStatus === "locked"
                    ? "bg-red-500 text-white"
                    : "bg-white/10 text-red-200 hover:bg-white/20"
                }`}
              >
                Bloqueadas
              </button>
            </div>
          </div>
        </div>

        {/* Subjects by semester */}
        <div className="space-y-6">
          {Object.entries(groupedSubjects)
            .sort(([a], [b]) => {
              const semA = parseFloat(a.split(" ")[1]);
              const semB = parseFloat(b.split(" ")[1]);
              return semA - semB;
            })
            .map(([semester, subjectList]) => (
              <div
                key={semester}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="text-indigo-300" size={24} />
                  <h2 className="text-2xl font-bold text-white">{semester}</h2>
                  <span className="ml-auto text-indigo-300 text-sm">
                    {subjectList.filter((s) => subjectStatus[s.id]).length}/
                    {subjectList.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjectList.map((subject) => {
                    const status = subjectStatus[subject.id];
                    const displayStatus = getSubjectDisplayStatus(subject);
                    const isComplete = status === "total";
                    const isPartial = status === "partial";
                    const isAvailable = displayStatus === "unlocked";
                    const isLocked = displayStatus === "locked";
                    const totalCredits = getTotalCredits();

                    return (
                      <button
                        key={subject.id}
                        onClick={() => toggleSubject(subject.id)}
                        disabled={isLocked && !status}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
                          isComplete
                            ? "bg-green-500/30 border-green-400 hover:bg-green-500/40"
                            : isPartial
                              ? "bg-yellow-500/30 border-yellow-400 hover:bg-yellow-500/40"
                              : isAvailable
                                ? "bg-blue-500/20 border-blue-400 hover:bg-blue-500/30 hover:scale-105"
                                : "bg-red-500/10 border-red-400/50 opacity-60 cursor-not-allowed"
                        }`}
                      >
                        {subject.type === "elective" && (
                          <div className="absolute top-2 right-2 bg-purple-500/40 text-purple-200 text-xs px-2 py-1 rounded">
                            Electiva
                          </div>
                        )}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 pr-2">
                            <div className="text-white font-semibold mb-1 leading-tight">
                              {subject.name}
                            </div>
                            <div className="flex gap-2 items-center flex-wrap">
                              <div className="text-xs text-indigo-200">
                                {typeof subject.id === "string" &&
                                subject.id.startsWith("e")
                                  ? "A elección"
                                  : typeof subject.id === "string"
                                    ? "Genérica"
                                    : `ID: ${subject.id}`}
                              </div>
                              {subject.credits > 0 && (
                                <div className="text-xs bg-yellow-500/30 text-yellow-200 px-2 py-0.5 rounded">
                                  {subject.credits} crédito
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0">
                            {isComplete ? (
                              <CheckCircle
                                className="text-green-300"
                                size={24}
                              />
                            ) : isPartial ? (
                              <Circle className="text-yellow-300" size={24} />
                            ) : isAvailable ? (
                              <Unlock className="text-blue-300" size={24} />
                            ) : (
                              <Lock className="text-red-300" size={24} />
                            )}
                          </div>
                        </div>

                        {(subject.depsPartial.length > 0 ||
                          subject.depsTotal.length > 0 ||
                          subject.standing > 0) && (
                          <div className="text-xs text-indigo-200 mt-2 pt-2 border-t border-white/20 space-y-1">
                            {subject.standing > 0 && (
                              <div
                                className={
                                  totalCredits >= subject.standing
                                    ? "text-green-300"
                                    : "text-red-300"
                                }
                              >
                                📊 Requiere {subject.standing} créditos totales
                              </div>
                            )}
                            {subject.depsTotal.length > 0 && (
                              <div>
                                <strong>Total:</strong>{" "}
                                {subject.depsTotal
                                  .map((depId) => {
                                    const dep = subjects.find(
                                      (s) => s.id === depId,
                                    );
                                    return dep ? dep.name : depId;
                                  })
                                  .join(", ")}
                              </div>
                            )}
                            {subject.depsPartial.length > 0 && (
                              <div>
                                <strong>Parcial:</strong>{" "}
                                {subject.depsPartial
                                  .map((depId) => {
                                    const dep = subjects.find(
                                      (s) => s.id === depId,
                                    );
                                    return dep ? dep.name : depId;
                                  })
                                  .join(", ")}
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-3">💡 Cómo usar</h3>
          <div className="grid md:grid-cols-2 gap-4 text-indigo-200 text-sm">
            <div className="space-y-2">
              <p>
                🟢 <strong className="text-green-300">Verde</strong>: Crédito
                TOTAL{" "}
              </p>
              <p>
                🟡 <strong className="text-yellow-300">Amarillo</strong>:
                Crédito PARCIAL{" "}
              </p>
              <p>
                🔵 <strong className="text-blue-300">Azul</strong>: Disponible
                para cursar ahora
              </p>
              <p>
                🔴 <strong className="text-red-300">Rojo</strong>: Bloqueada
                (faltan requisitos)
              </p>
            </div>
            <div className="space-y-2">
              <p>
                ✨ <strong>1er click</strong>: Marca como PARCIAL
              </p>
              <p>
                ✨ <strong>2do click</strong>: Marca como TOTAL (suma créditos)
              </p>
              <p>
                ✨ <strong>3er click</strong>: Desmarca la materia
              </p>
              <p>💾 Tu progreso se guarda automáticamente en tu navegador</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
