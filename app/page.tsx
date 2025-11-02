"use client";

import { useState } from "react";
import {
  DocumentTextIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
  Bars3BottomLeftIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  LockClosedIcon,
  SparklesIcon,
  ArrowsRightLeftIcon,
  Bars3Icon,
  XMarkIcon as XIcon,
} from "@heroicons/react/24/outline";

type Tool =
  | "word-counter"
  | "case-converter"
  | "text-cleaner"
  | "find-replace"
  | "encoder"
  | "lorem-generator"
  | "text-reverser"
  | "duplicate-remover"
  | "line-sorter"
  | "text-diff";

interface ToolInfo {
  id: Tool;
  name: string;
  description: string;
  icon: any;
}

const tools: ToolInfo[] = [
  {
    id: "word-counter",
    name: "Đếm Từ",
    description: "Thống kê từ, ký tự",
    icon: Bars3BottomLeftIcon,
  },
  {
    id: "case-converter",
    name: "Chữ Hoa/Thường",
    description: "UPPER, lower, Title",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    id: "text-cleaner",
    name: "Làm Sạch",
    description: "Xóa khoảng trắng thừa",
    icon: SparklesIcon,
  },
  {
    id: "find-replace",
    name: "Tìm & Thay",
    description: "Tìm và thay thế",
    icon: MagnifyingGlassIcon,
  },
  {
    id: "encoder",
    name: "Mã Hóa",
    description: "Base64, URL, HTML",
    icon: LockClosedIcon,
  },
  {
    id: "lorem-generator",
    name: "Lorem Ipsum",
    description: "Tạo văn bản giả",
    icon: DocumentTextIcon,
  },
  {
    id: "text-reverser",
    name: "Đảo Ngược",
    description: "Đảo từ, dòng, text",
    icon: ArrowPathIcon,
  },
  {
    id: "duplicate-remover",
    name: "Xóa Trùng",
    description: "Loại bỏ trùng lặp",
    icon: ClipboardDocumentIcon,
  },
  {
    id: "line-sorter",
    name: "Sắp Xếp",
    description: "A-Z, Z-A, độ dài",
    icon: ArrowsRightLeftIcon,
  },
  {
    id: "text-diff",
    name: "So Sánh",
    description: "Tìm khác biệt",
    icon: CheckCircleIcon,
  },
];

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>("word-counter");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Word Counter Stats
  const getTextStats = (text: string) => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split("\n").length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;

    return { chars, charsNoSpaces, words, lines, sentences, paragraphs };
  };

  // Case Converter Functions
  const toUpperCase = () => setOutputText(inputText.toUpperCase());
  const toLowerCase = () => setOutputText(inputText.toLowerCase());
  const toTitleCase = () => {
    const result = inputText
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setOutputText(result);
  };
  const toSentenceCase = () => {
    const result = inputText
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    setOutputText(result);
  };
  const toCamelCase = () => {
    const result = inputText
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
    setOutputText(result);
  };
  const toSnakeCase = () => {
    const result = inputText
      .replace(/\s+/g, "_")
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      .replace(/^_/, "");
    setOutputText(result);
  };
  const toKebabCase = () => {
    const result = inputText
      .replace(/\s+/g, "-")
      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
      .replace(/^-/, "")
      .toLowerCase();
    setOutputText(result);
  };

  // Text Cleaner Functions
  const removeExtraSpaces = () => {
    const result = inputText.replace(/\s+/g, " ").trim();
    setOutputText(result);
  };
  const removeAllSpaces = () => {
    const result = inputText.replace(/\s/g, "");
    setOutputText(result);
  };
  const removeEmptyLines = () => {
    const result = inputText
      .split("\n")
      .filter((line) => line.trim())
      .join("\n");
    setOutputText(result);
  };
  const trimLines = () => {
    const result = inputText
      .split("\n")
      .map((line) => line.trim())
      .join("\n");
    setOutputText(result);
  };

  // Find & Replace
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const findAndReplace = () => {
    const flags = caseSensitive ? "g" : "gi";
    const regex = new RegExp(
      findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      flags
    );
    const result = inputText.replace(regex, replaceText);
    setOutputText(result);
  };

  // Encoder/Decoder Functions
  const encodeBase64 = () => {
    try {
      const result = btoa(unescape(encodeURIComponent(inputText)));
      setOutputText(result);
    } catch (error) {
      setOutputText("Lỗi: Không thể mã hóa");
    }
  };

  const decodeBase64 = () => {
    try {
      const result = decodeURIComponent(escape(atob(inputText)));
      setOutputText(result);
    } catch (error) {
      setOutputText("Lỗi: Dữ liệu Base64 không hợp lệ");
    }
  };

  const encodeURL = () => {
    const result = encodeURIComponent(inputText);
    setOutputText(result);
  };

  const decodeURL = () => {
    try {
      const result = decodeURIComponent(inputText);
      setOutputText(result);
    } catch (error) {
      setOutputText("Lỗi: URL không hợp lệ");
    }
  };

  const encodeHTML = () => {
    const result = inputText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    setOutputText(result);
  };

  const decodeHTML = () => {
    const result = inputText
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
    setOutputText(result);
  };

  // Lorem Ipsum Generator
  const [loremCount, setLoremCount] = useState(5);
  const [loremType, setLoremType] = useState<
    "paragraphs" | "sentences" | "words"
  >("paragraphs");

  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
  ];

  const generateLorem = () => {
    let result = "";

    if (loremType === "words") {
      const words = [];
      for (let i = 0; i < loremCount; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      result = words.join(" ") + ".";
    } else if (loremType === "sentences") {
      const sentences = [];
      for (let i = 0; i < loremCount; i++) {
        const wordCount = Math.floor(Math.random() * 10) + 5;
        const words = [];
        for (let j = 0; j < wordCount; j++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        sentences.push(words.join(" ") + ".");
      }
      result = sentences.join(" ");
    } else {
      const paragraphs = [];
      for (let i = 0; i < loremCount; i++) {
        const sentenceCount = Math.floor(Math.random() * 3) + 3;
        const sentences = [];
        for (let j = 0; j < sentenceCount; j++) {
          const wordCount = Math.floor(Math.random() * 10) + 5;
          const words = [];
          for (let k = 0; k < wordCount; k++) {
            words.push(
              loremWords[Math.floor(Math.random() * loremWords.length)]
            );
          }
          words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
          sentences.push(words.join(" ") + ".");
        }
        paragraphs.push(sentences.join(" "));
      }
      result = paragraphs.join("\n\n");
    }

    setOutputText(result);
  };

  // Text Reverser
  const reverseText = () => {
    const result = inputText.split("").reverse().join("");
    setOutputText(result);
  };

  const reverseWords = () => {
    const result = inputText.split(" ").reverse().join(" ");
    setOutputText(result);
  };

  const reverseLines = () => {
    const result = inputText.split("\n").reverse().join("\n");
    setOutputText(result);
  };

  // Duplicate Remover
  const removeDuplicateLines = () => {
    const lines = inputText.split("\n");
    const uniqueLines = [...new Set(lines)];
    setOutputText(uniqueLines.join("\n"));
  };

  const removeDuplicateWords = () => {
    const words = inputText.split(/\s+/);
    const uniqueWords = [...new Set(words)];
    setOutputText(uniqueWords.join(" "));
  };

  // Line Sorter
  const sortLinesAZ = () => {
    const lines = inputText.split("\n");
    const sorted = lines.sort((a, b) => a.localeCompare(b));
    setOutputText(sorted.join("\n"));
  };

  const sortLinesZA = () => {
    const lines = inputText.split("\n");
    const sorted = lines.sort((a, b) => b.localeCompare(a));
    setOutputText(sorted.join("\n"));
  };

  const sortLinesByLength = () => {
    const lines = inputText.split("\n");
    const sorted = lines.sort((a, b) => a.length - b.length);
    setOutputText(sorted.join("\n"));
  };

  // Text Diff
  const [compareText, setCompareText] = useState("");

  const compareTexts = () => {
    const text1Lines = inputText.split("\n");
    const text2Lines = compareText.split("\n");
    const maxLines = Math.max(text1Lines.length, text2Lines.length);

    let result = "So sánh:\n\n";
    for (let i = 0; i < maxLines; i++) {
      const line1 = text1Lines[i] || "";
      const line2 = text2Lines[i] || "";

      if (line1 === line2) {
        result += `✓ Dòng ${i + 1}: Giống nhau\n`;
      } else {
        result += `✗ Dòng ${i + 1}: Khác nhau\n`;
        result += `  Text 1: ${line1}\n`;
        result += `  Text 2: ${line2}\n`;
      }
    }

    setOutputText(result);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clear all
  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setFindText("");
    setReplaceText("");
    setCompareText("");
  };

  const stats = getTextStats(inputText);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <DocumentTextIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 flex-shrink-0" />
              <div>
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800">
                  Text Tools Pro
                </h1>
                <p className="hidden sm:block text-xs sm:text-sm text-gray-600 mt-1">
                  Bộ công cụ xử lý văn bản đa năng
                </p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* Tools Grid - Desktop */}
          <div className="hidden lg:grid grid-cols-5 gap-3 xl:gap-4 mb-6 lg:mb-8">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTool(tool.id);
                    setOutputText("");
                  }}
                  className={`p-3 xl:p-4 rounded-xl border-2 transition-all ${
                    activeTool === tool.id
                      ? "border-purple-500 bg-purple-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 xl:w-8 xl:h-8 mx-auto mb-2 ${
                      activeTool === tool.id
                        ? "text-purple-600"
                        : "text-gray-400"
                    }`}
                  />
                  <h3
                    className={`text-xs xl:text-sm font-semibold text-center ${
                      activeTool === tool.id
                        ? "text-purple-700"
                        : "text-gray-700"
                    }`}
                  >
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-500 text-center mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Tools Grid - Tablet */}
          <div className="hidden sm:grid lg:hidden grid-cols-3 gap-3 mb-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTool(tool.id);
                    setOutputText("");
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    activeTool === tool.id
                      ? "border-purple-500 bg-purple-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 mx-auto mb-2 ${
                      activeTool === tool.id
                        ? "text-purple-600"
                        : "text-gray-400"
                    }`}
                  />
                  <h3
                    className={`text-xs font-semibold text-center ${
                      activeTool === tool.id
                        ? "text-purple-700"
                        : "text-gray-700"
                    }`}
                  >
                    {tool.name}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Tools Menu - Mobile Dropdown */}
          <div className="sm:hidden mb-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full p-4 bg-white rounded-xl shadow-lg border-2 border-purple-500 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = tools.find((t) => t.id === activeTool)?.icon;
                  return Icon ? (
                    <Icon className="w-6 h-6 text-purple-600" />
                  ) : null;
                })()}
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {tools.find((t) => t.id === activeTool)?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {tools.find((t) => t.id === activeTool)?.description}
                  </p>
                </div>
              </div>
              <Bars3Icon className="w-5 h-5 text-gray-400" />
            </button>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setActiveTool(tool.id);
                        setOutputText("");
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full p-4 flex items-center gap-3 border-b border-gray-100 last:border-b-0 transition-colors ${
                        activeTool === tool.id
                          ? "bg-purple-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 flex-shrink-0 ${
                          activeTool === tool.id
                            ? "text-purple-600"
                            : "text-gray-400"
                        }`}
                      />
                      <div className="text-left flex-grow">
                        <p
                          className={`text-sm font-semibold ${
                            activeTool === tool.id
                              ? "text-purple-700"
                              : "text-gray-700"
                          }`}
                        >
                          {tool.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {tool.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Word Counter */}
          {activeTool === "word-counter" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Nhập văn bản cần phân tích
                </h2>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập hoặc dán văn bản vào đây..."
                  className="w-full h-48 sm:h-56 lg:h-64 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm opacity-90">Ký tự</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 sm:mt-2">
                    {stats.chars}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm opacity-90">
                    Không khoảng trắng
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 sm:mt-2">
                    {stats.charsNoSpaces}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm opacity-90">Từ</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 sm:mt-2">
                    {stats.words}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm opacity-90">Dòng</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 sm:mt-2">
                    {stats.lines}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm opacity-90">Câu</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 sm:mt-2">
                    {stats.sentences}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm opacity-90">Đoạn văn</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 sm:mt-2">
                    {stats.paragraphs}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Case Converter */}
          {activeTool === "case-converter" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Văn bản gốc
                </h2>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập văn bản cần chuyển đổi..."
                  className="w-full h-28 sm:h-32 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                <button
                  onClick={toUpperCase}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-xs sm:text-sm"
                >
                  UPPERCASE
                </button>
                <button
                  onClick={toLowerCase}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-xs sm:text-sm"
                >
                  lowercase
                </button>
                <button
                  onClick={toTitleCase}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold text-xs sm:text-sm"
                >
                  Title Case
                </button>
                <button
                  onClick={toSentenceCase}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-xs sm:text-sm"
                >
                  Sentence case
                </button>
                <button
                  onClick={toCamelCase}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold text-xs sm:text-sm"
                >
                  camelCase
                </button>
                <button
                  onClick={toSnakeCase}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold text-xs sm:text-sm"
                >
                  snake_case
                </button>
                <button
                  onClick={toKebabCase}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-xs sm:text-sm col-span-2 sm:col-span-1"
                >
                  kebab-case
                </button>
              </div>

              {outputText && (
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Kết quả
                    </h2>
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      {copied ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {copied ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full h-28 sm:h-32 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-lg resize-none text-sm sm:text-base"
                  />
                </div>
              )}
            </div>
          )}

          {/* Text Cleaner */}
          {activeTool === "text-cleaner" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Văn bản gốc
                </h2>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập văn bản cần làm sạch..."
                  className="w-full h-40 sm:h-48 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                <button
                  onClick={removeExtraSpaces}
                  className="px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-xs sm:text-sm"
                >
                  Xóa khoảng trắng thừa
                </button>
                <button
                  onClick={removeAllSpaces}
                  className="px-4 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-xs sm:text-sm"
                >
                  Xóa tất cả khoảng trắng
                </button>
                <button
                  onClick={removeEmptyLines}
                  className="px-4 py-2 sm:py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold text-xs sm:text-sm"
                >
                  Xóa dòng trống
                </button>
                <button
                  onClick={trimLines}
                  className="px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-xs sm:text-sm"
                >
                  Trim từng dòng
                </button>
              </div>

              {outputText && (
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Kết quả
                    </h2>
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      {copied ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {copied ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full h-40 sm:h-48 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-lg resize-none text-sm sm:text-base"
                  />
                </div>
              )}
            </div>
          )}

          {/* Find & Replace */}
          {activeTool === "find-replace" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Văn bản gốc
                </h2>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập văn bản..."
                  className="w-full h-40 sm:h-48 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                />
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">
                      Tìm kiếm
                    </label>
                    <input
                      type="text"
                      value={findText}
                      onChange={(e) => setFindText(e.target.value)}
                      placeholder="Nhập từ cần tìm..."
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">
                      Thay thế bằng
                    </label>
                    <input
                      type="text"
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                      placeholder="Nhập từ thay thế..."
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={caseSensitive}
                      onChange={(e) => setCaseSensitive(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700 text-sm sm:text-base">
                      Phân biệt chữ hoa/thường
                    </span>
                  </label>
                </div>

                <button
                  onClick={findAndReplace}
                  disabled={!findText}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition font-semibold text-sm sm:text-base"
                >
                  Thay thế tất cả
                </button>
              </div>

              {outputText && (
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Kết quả
                    </h2>
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      {copied ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {copied ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full h-40 sm:h-48 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-lg resize-none text-sm sm:text-base"
                  />
                </div>
              )}
            </div>
          )}

          {/* Encoder/Decoder */}
          {activeTool === "encoder" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Văn bản gốc
                </h2>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập văn bản cần mã hóa/giải mã..."
                  className="w-full h-28 sm:h-32 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                <button
                  onClick={encodeBase64}
                  className="px-2 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-xs sm:text-sm"
                >
                  Mã hóa Base64
                </button>
                <button
                  onClick={decodeBase64}
                  className="px-2 sm:px-4 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-xs sm:text-sm"
                >
                  Giải mã Base64
                </button>
                <button
                  onClick={encodeURL}
                  className="px-2 sm:px-4 py-2 sm:py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold text-xs sm:text-sm"
                >
                  Mã hóa URL
                </button>
                <button
                  onClick={decodeURL}
                  className="px-2 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-xs sm:text-sm"
                >
                  Giải mã URL
                </button>
                <button
                  onClick={encodeHTML}
                  className="px-2 sm:px-4 py-2 sm:py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold text-xs sm:text-sm"
                >
                  Mã hóa HTML
                </button>
                <button
                  onClick={decodeHTML}
                  className="px-2 sm:px-4 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold text-xs sm:text-sm"
                >
                  Giải mã HTML
                </button>
              </div>

              {outputText && (
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Kết quả
                    </h2>
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      {copied ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {copied ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full h-28 sm:h-32 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-lg resize-none text-sm sm:text-base"
                  />
                </div>
              )}
            </div>
          )}

          {/* Lorem Generator */}
          {activeTool === "lorem-generator" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Cài đặt Lorem Ipsum
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">
                      Số lượng: {loremCount}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={loremCount}
                      onChange={(e) => setLoremCount(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">
                      Loại
                    </label>
                    <select
                      value={loremType}
                      onChange={(e) => setLoremType(e.target.value as any)}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="paragraphs">Đoạn văn</option>
                      <option value="sentences">Câu</option>
                      <option value="words">Từ</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={generateLorem}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-sm sm:text-base"
                >
                  Tạo Lorem Ipsum
                </button>
              </div>

              {outputText && (
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Kết quả
                    </h2>
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      {copied ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {copied ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full h-48 sm:h-56 lg:h-64 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-lg resize-none text-sm sm:text-base"
                  />
                </div>
              )}
            </div>
          )}

          {/* Text Reverser */}
          {activeTool === "text-reverser" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Văn bản gốc
                </h2>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập văn bản cần đảo ngược..."
                  className="w-full h-28 sm:h-32 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                <button
                  onClick={reverseText}
                  className="px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-xs sm:text-sm"
                >
                  Đảo ngược ký tự
                </button>
                <button
                  onClick={reverseWords}
                  className="px-4 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-xs sm:text-sm"
                >
                  Đảo ngược từ
                </button>
                <button
                  onClick={reverseLines}
                  className="px-4 py-2 sm:py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold text-xs sm:text-sm"
                >
                  Đảo ngược dòng
                </button>
              </div>

              {outputText && (
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Kết quả
                    </h2>
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      {copied ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {copied ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full h-28 sm:h-32 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-lg resize-none text-sm sm:text-base"
                  />
                </div>
              )}
            </div>
          )}

          {/* Duplicate Remover */}
          {activeTool === "duplicate-remover" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Văn bản gốc
                </h2>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập văn bản có trùng lặp..."
                  className="w-full h-40 sm:h-48 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                <button
                  onClick={removeDuplicateLines}
                  className="px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-xs sm:text-sm"
                >
                  Xóa dòng trùng lặp
                </button>
                <button
                  onClick={removeDuplicateWords}
                  className="px-4 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-xs sm:text-sm"
                >
                  Xóa từ trùng lặp
                </button>
              </div>

              {outputText && (
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Kết quả
                    </h2>
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      {copied ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {copied ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full h-40 sm:h-48 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-lg resize-none text-sm sm:text-base"
                  />
                </div>
              )}
            </div>
          )}

          {/* Line Sorter */}
          {activeTool === "line-sorter" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Văn bản gốc
                </h2>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập văn bản cần sắp xếp..."
                  className="w-full h-40 sm:h-48 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                <button
                  onClick={sortLinesAZ}
                  className="px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-xs sm:text-sm"
                >
                  Sắp xếp A-Z
                </button>
                <button
                  onClick={sortLinesZA}
                  className="px-4 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-xs sm:text-sm"
                >
                  Sắp xếp Z-A
                </button>
                <button
                  onClick={sortLinesByLength}
                  className="px-4 py-2 sm:py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold text-xs sm:text-sm"
                >
                  Theo độ dài
                </button>
              </div>

              {outputText && (
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Kết quả
                    </h2>
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      {copied ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {copied ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full h-40 sm:h-48 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-lg resize-none text-sm sm:text-base"
                  />
                </div>
              )}
            </div>
          )}

          {/* Text Diff */}
          {activeTool === "text-diff" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Văn bản 1
                  </h2>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Nhập văn bản thứ nhất..."
                    className="w-full h-48 sm:h-56 lg:h-64 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                  />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Văn bản 2
                  </h2>
                  <textarea
                    value={compareText}
                    onChange={(e) => setCompareText(e.target.value)}
                    placeholder="Nhập văn bản thứ hai..."
                    className="w-full h-48 sm:h-56 lg:h-64 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                  />
                </div>
              </div>

              <button
                onClick={compareTexts}
                disabled={!inputText || !compareText}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition font-semibold text-sm sm:text-base"
              >
                So sánh văn bản
              </button>

              {outputText && (
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Kết quả so sánh
                    </h2>
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      {copied ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {copied ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                  <pre className="w-full max-h-64 sm:max-h-80 lg:max-h-96 overflow-auto p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm whitespace-pre-wrap break-words">
                    {outputText}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Clear Button */}
          {(inputText || outputText) && (
            <div className="text-center mt-6 sm:mt-8">
              <button
                onClick={clearAll}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-sm sm:text-base"
              >
                Xóa tất cả
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 text-center text-gray-600 text-xs sm:text-sm">
          <p>
            Text Tools Pro - Bộ công cụ xử lý văn bản chuyên nghiệp 🚀 - DONATE
            : 050133514497 - SACOMBANK - DINH NGUYEN MINH HOANG
          </p>
        </div>
      </footer>
    </div>
  );
}
