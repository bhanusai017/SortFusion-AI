"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";
import jsPDF from "jspdf";
export default function Home() {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [visualArray, setVisualArray] = useState<number[]>([]);

  useEffect(() => {
    const parsed = numbers
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    setVisualArray(parsed);
  }, [numbers]);

  const animateSorting = async (
    original: number[],
    sorted: number[]
  ) => {
    let temp = [...original];

    for (let i = 0; i < sorted.length; i++) {
      const correctValue = sorted[i];

      const currentIndex = temp.indexOf(correctValue);

      [temp[i], temp[currentIndex]] = [
        temp[currentIndex],
        temp[i],
      ];

      setVisualArray([...temp]);

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );
    }
  };
const handleCSVUpload = (
  event: React.ChangeEvent<HTMLInputElement>
) => {

  const file = event.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {

    const text = e.target?.result as string;

    const parsed = text
      .split(/[\s,]+/)
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    setNumbers(parsed.join(", "));
  };

  reader.readAsText(file);
};
  const generateDataset = (type: string) => {
    let generated: number[] = [];

    const size = 20;

    switch (type) {
      case "random":
        generated = Array.from(
          { length: size },
          () => Math.floor(Math.random() * 100)
        );
        break;

      case "sorted":
        generated = Array.from(
          { length: size },
          (_, i) => i + 1
        );
        break;

      case "reverse":
        generated = Array.from(
          { length: size },
          (_, i) => size - i
        );
        break;

      case "nearly":
        generated = Array.from(
          { length: size },
          (_, i) => i + 1
        );

        [generated[5], generated[6]] = [
          generated[6],
          generated[5],
        ];

        [generated[12], generated[13]] = [
          generated[13],
          generated[12],
        ];

        break;

      case "fewUnique":
        generated = Array.from(
          { length: size },
          () =>
            [5, 10, 15, 20][
              Math.floor(Math.random() * 4)
            ]
        );
        break;

      default:
        break;
    }

    setNumbers(generated.join(", "));
  };
const exportPDF = () => {

  if (!result) return;

  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "SortFusion AI Performance Report",
    20,
    20
  );

  doc.setFontSize(14);

  doc.text(
    `Selected Algorithm: ${result.selected_algorithm}`,
    20,
    50
  );

  doc.text(
    `Execution Time: ${result.execution_time}s`,
    20,
    65
  );

  doc.text(
    `Memory Usage: ${result.memory_usage} KB`,
    20,
    80
  );

  doc.text(
    `Comparisons: ${result.comparisons || 0}`,
    20,
    95
  );

  doc.text(
    `Swaps: ${result.swaps || 0}`,
    20,
    110
  );

  doc.text(
    `Dataset Size: ${result.dataset_analysis.size}`,
    20,
    125
  );

  doc.text(
    `Sortedness: ${result.dataset_analysis.sortedness}%`,
    20,
    140
  );

  doc.text(
    `AI Confidence: ${result.ai_confidence}%`,
    20,
    155
  );

  doc.text(
    `AI Reason: ${result.ai_reason}`,
    20,
    170,
    {
      maxWidth: 160
    }
  );

  doc.save("SortFusion_Report.pdf");
};
  const handleCompare = async () => {
    try {
      const parsedNumbers = numbers
        .split(",")
        .map((num) => parseInt(num.trim()))
        .filter((num) => !isNaN(num));

      const response = await fetch(
        "https://opulent-space-cod-wv76wgwpg57jcg945-8000.app.github.dev/compare",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: parsedNumbers,
          }),
        }
      );

      const data = await response.json();

      setComparisonData(data.algorithms);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = async () => {
    try {
      setLoading(true);

      const parsedNumbers = numbers
        .split(",")
        .map((num) => parseInt(num.trim()))
        .filter((num) => !isNaN(num));

      const response = await fetch(
        "https://opulent-space-cod-wv76wgwpg57jcg945-8000.app.github.dev/sort",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: parsedNumbers,
          }),
        }
      );

      const data = await response.json();

      await animateSorting(
        parsedNumbers,
        data.sorted_array
      );

      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = result
    ? [
        {
          name: "Execution Time",
          value: result.execution_time,
        },
        {
          name: "Memory Usage",
          value: result.memory_usage,
        },
        {
          name: "Comparisons",
          value: result.comparisons || 0,
        },
        {
          name: "Swaps",
          value: result.swaps || 0,
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden px-6 py-10">
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full" />

      {/* Main Content */}
      <section className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-14">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            SortFusion AI
          </motion.h1>

          <p className="mt-5 text-xl text-gray-300">
            Intelligent Hybrid Adaptive Sorting
            Engine
          </p>
        </div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {/* Dataset Generator */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="mb-6">

  <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-cyan-400/30 rounded-2xl cursor-pointer hover:bg-cyan-500/10 transition-all">

    <div className="text-center">

      <p className="text-cyan-300 text-lg font-semibold">
        Upload CSV Dataset
      </p>

      <p className="text-sm text-gray-400 mt-2">
        Supports comma or space separated numbers
      </p>

    </div>

    <input
      type="file"
      accept=".csv,.txt"
      className="hidden"
      onChange={handleCSVUpload}
    />

  </label>

</div>
            <button
              onClick={() =>
                generateDataset("random")
              }
              className="px-5 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/20 hover:scale-105 transition-all"
            >
              Random
            </button>

            <button
              onClick={() =>
                generateDataset("sorted")
              }
              className="px-5 py-3 rounded-xl bg-green-500/20 border border-green-400/20 hover:scale-105 transition-all"
            >
              Sorted
            </button>

            <button
              onClick={() =>
                generateDataset("reverse")
              }
              className="px-5 py-3 rounded-xl bg-red-500/20 border border-red-400/20 hover:scale-105 transition-all"
            >
              Reverse
            </button>

            <button
              onClick={() =>
                generateDataset("nearly")
              }
              className="px-5 py-3 rounded-xl bg-purple-500/20 border border-purple-400/20 hover:scale-105 transition-all"
            >
              Nearly Sorted
            </button>

            <button
              onClick={() =>
                generateDataset("fewUnique")
              }
              className="px-5 py-3 rounded-xl bg-pink-500/20 border border-pink-400/20 hover:scale-105 transition-all"
            >
              Few Unique
            </button>
          </div>

          <label className="block text-lg mb-4 text-cyan-300">
            Enter Numbers (comma separated)
          </label>

          <textarea
            value={numbers}
            onChange={(e) =>
              setNumbers(e.target.value)
            }
            placeholder="Example: 5, 2, 9, 1, 7"
            className="w-full h-36 rounded-2xl bg-[#0f172a] border border-white/10 p-5 text-lg outline-none focus:border-cyan-400"
          />

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleSort}
              disabled={loading}
              className="px-8 py-4 rounded-2xl bg-cyan-500 hover:scale-105 transition-all duration-300 text-lg font-semibold shadow-lg shadow-cyan-500/30 disabled:opacity-50"
            >
              {loading
                ? "Analyzing..."
                : "Run Adaptive Sort"}
            </button>

            <button
              onClick={handleCompare}
              className="px-8 py-4 rounded-2xl bg-purple-500 hover:scale-105 transition-all duration-300 text-lg font-semibold shadow-lg shadow-purple-500/30"
            >
              Compare Algorithms
            </button>
            <button
  onClick={exportPDF}
  className="mt-6 ml-4 px-8 py-4 rounded-2xl bg-pink-500 hover:scale-105 transition-all duration-300 text-lg font-semibold shadow-lg shadow-pink-500/30"
>
  Export PDF Report
</button>
          </div>
        </motion.div>

        {/* Visualization Arena */}
        <div className="mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
            Real-Time Visualization Arena
          </h2>

          <div className="flex items-end justify-center gap-2 h-[350px] overflow-x-auto">
            {visualArray.map((value, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{
                  height: `${value * 3}px`,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="
                  w-10
                  rounded-t-xl
                  bg-gradient-to-t
                  from-cyan-500
                  to-purple-500
                  transition-all
                  duration-700
                  ease-in-out
                  shadow-[0_0_25px_rgba(34,211,238,0.5)]
                  hover:scale-110
                "
                style={{
                  minHeight: "20px",
                }}
              >
                <div className="text-center text-xs mt-2">
                  {value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Algorithm Battle Arena */}
        {comparisonData.length > 0 && (
          <div className="mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-pink-400 to-cyan-400 text-transparent bg-clip-text">
              Algorithm Battle Arena
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {comparisonData.map((algo, index) => (
                <div
                  key={index}
                  className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-cyan-300 mb-5">
                    {algo.algorithm}
                  </h3>

                  <p className="mb-2">
                    Time:{" "}
                    {algo.execution_time}s
                  </p>

                  <p className="mb-2">
                    Memory:{" "}
                    {algo.memory_usage} KB
                  </p>

                  <p className="mb-2">
                    Comparisons:{" "}
                    {algo.comparisons || 0}
                  </p>

                  <p className="mb-2">
                    Swaps: {algo.swaps || 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* AI Decision Engine */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                AI Decision Engine
              </h2>

              <p className="mb-2">
                <span className="text-gray-400">
                  Selected Algorithm:
                </span>{" "}
                {result.selected_algorithm}
              </p>

              <p className="mb-2">
                <span className="text-gray-400">
                  Dataset Size:
                </span>{" "}
                {result.dataset_analysis.size}
              </p>

              <p className="mb-2">
                <span className="text-gray-400">
                  Sortedness:
                </span>{" "}
                {
                  result.dataset_analysis
                    .sortedness
                }
                %
              </p>

              <p className="mb-2">
                <span className="text-gray-400">
                  Duplicate Ratio:
                </span>{" "}
                {
                  result.dataset_analysis
                    .duplicate_ratio
                }
                %
              </p>

              <div className="mt-6">
                <p className="mb-2">
                  <span className="text-gray-400">
                    AI Confidence:
                  </span>{" "}
                  {result.ai_confidence}%
                </p>

                <p className="text-sm text-cyan-200 leading-relaxed mt-3">
                  {result.ai_reason}
                </p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">
                Performance Metrics
              </h2>

              <p className="mb-2">
                <span className="text-gray-400">
                  Execution Time:
                </span>{" "}
                {result.execution_time}s
              </p>

              <p className="mb-2">
                <span className="text-gray-400">
                  Memory Usage:
                </span>{" "}
                {result.memory_usage} KB
              </p>

              <p className="mb-2">
                <span className="text-gray-400">
                  Comparisons:
                </span>{" "}
                {result.comparisons || 0}
              </p>

              <p className="mb-2">
                <span className="text-gray-400">
                  Swaps:
                </span>{" "}
                {result.swaps || 0}
              </p>
            </div>

            {/* Analytics Dashboard */}
            <div className="md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
                Performance Analytics Dashboard
              </h2>

              <div className="h-[400px] w-full min-h-[400px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#ffffff20"
                    />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      radius={[12, 12, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sorted Output */}
            <div className="md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">
                Sorted Output
              </h2>

              <div className="flex flex-wrap gap-3">
                {result.sorted_array.map(
                  (
                    num: number,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="px-4 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/20 text-lg"
                    >
                      {num}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}