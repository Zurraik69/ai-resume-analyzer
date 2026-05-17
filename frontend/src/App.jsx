import { useState } from "react"
import axios from "axios"

function App() {

  const [file, setFile] = useState(null)
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a resume")
      return
    }

    const formData = new FormData()

    formData.append("resume", file)

    try {

      setLoading(true)

      const response = await axios.post(
        "http://localhost:3000/upload",
        formData
      )

      setAnalysis(response.data.analysis)

      setLoading(false)

    } catch (error) {

      console.log(error)
      alert("Something went wrong")

    }

  }

  return (

    <div className="h-screen overflow-hidden bg-[#070b17] flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full top-0 left-0"></div>

      <div className="absolute w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full bottom-0 right-0"></div>

      {/* Main Container */}
      <div className="relative w-full max-w-5xl">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Resume Analyzer
          </h1>

          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Upload your resume and get AI-powered insights instantly
          </p>

        </div>

        {/* Main Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-5 md:p-6 shadow-2xl">

          {/* Upload Section */}
          <div className="bg-[#10182b] rounded-[24px] p-4 md:p-5 border border-cyan-500/20 shadow-lg">

            <div className="flex flex-col md:flex-row items-center gap-4">

              {/* Upload Card */}
              <label className="flex-1 w-full cursor-pointer">

                <div className="bg-[#0f1729] hover:bg-[#131d34] transition-all duration-300 rounded-2xl px-5 py-5 border border-white/10 flex items-center gap-4">

                  {/* Icon */}
                  <div className="min-w-[60px] h-[60px] rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg">
                    📄
                  </div>

                  {/* Text */}
                  <div className="overflow-hidden">

                    <h2 className="text-white text-xl font-bold">
                      Upload Resume
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                      PDF file only
                    </p>

                    {
                      file && (
                        <p className="text-cyan-400 text-sm mt-2 truncate">
                          {file.name}
                        </p>
                      )
                    }

                  </div>

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                  />

                </div>

              </label>

              {/* Analyze Button */}
              <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full md:w-[180px] h-[70px] rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl font-bold transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {
                   loading ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                   ) : (
                    "Analyze"
                   )
                }
              </button>

            </div>

          </div>

          {/* Result Section */}
          {
            analysis && (

              <div className="mt-6 bg-[#10182b] rounded-3xl p-5 border border-white/10 max-h-[300px] overflow-y-auto">

                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  AI Analysis
                </h2>

                <pre className="whitespace-pre-wrap text-gray-300 leading-7 text-sm md:text-base">
                  {analysis}
                </pre>

              </div>

            )
          }

        </div>

      </div>

    </div>

  )
}

export default App