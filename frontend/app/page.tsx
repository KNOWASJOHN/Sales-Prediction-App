"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, TrendingUp, Tv, Radio, Newspaper, CheckCircle, AlertCircle } from "lucide-react"

interface PredictionResult {
  prediction: number
  success: boolean
}

export default function SalesPredictionTool() {
  const [formData, setFormData] = useState({
    tv: "",
    radio: "",
    newspaper: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear previous results when user starts typing
    if (result || error) {
      setResult(null)
      setError(null)
    }
  }

  const validateInputs = () => {
    const tv = Number.parseFloat(formData.tv)
    const radio = Number.parseFloat(formData.radio)
    const newspaper = Number.parseFloat(formData.newspaper)

    if (!formData.tv || !formData.radio || !formData.newspaper) {
      return "All fields are required"
    }

    if (isNaN(tv) || isNaN(radio) || isNaN(newspaper)) {
      return "Please enter valid numbers"
    }

    if (tv < 0 || radio < 0 || newspaper < 0) {
      return "Budget values must be positive"
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateInputs()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("https://your-vercel-api-endpoint.vercel.app/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tv: Number.parseFloat(formData.tv),
          radio: Number.parseFloat(formData.radio),
          newspaper: Number.parseFloat(formData.newspaper),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data: PredictionResult = await response.json()
      setResult(data)
    } catch (err) {
      setError("Unable to get prediction. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({ tv: "", radio: "", newspaper: "" })
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-8 w-8 text-white" />
            <h1 className="text-4xl font-bold text-white">Sales Prediction Tool</h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Forecast your sales performance based on advertising budget allocation across TV, Radio, and Newspaper
            channels
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-white">Enter Your Advertising Budgets</CardTitle>
              <CardDescription className="text-white/80">
                Input your planned advertising spend in thousands of dollars for each channel
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* TV Budget Input */}
                <div className="space-y-2">
                  <Label htmlFor="tv" className="text-sm font-medium text-white flex items-center gap-2">
                    <Tv className="h-4 w-4 text-white" />
                    TV Ad Budget ($1000s)
                  </Label>
                  <Input
                    id="tv"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g., 100.5"
                    value={formData.tv}
                    onChange={(e) => handleInputChange("tv", e.target.value)}
                    className="h-12 text-lg bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:ring-white/50 focus:border-white/50"
                    required
                  />
                </div>

                {/* Radio Budget Input */}
                <div className="space-y-2">
                  <Label htmlFor="radio" className="text-sm font-medium text-white flex items-center gap-2">
                    <Radio className="h-4 w-4 text-white" />
                    Radio Ad Budget ($1000s)
                  </Label>
                  <Input
                    id="radio"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g., 50.2"
                    value={formData.radio}
                    onChange={(e) => handleInputChange("radio", e.target.value)}
                    className="h-12 text-lg bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:ring-white/50 focus:border-white/50"
                    required
                  />
                </div>

                {/* Newspaper Budget Input */}
                <div className="space-y-2">
                  <Label htmlFor="newspaper" className="text-sm font-medium text-white flex items-center gap-2">
                    <Newspaper className="h-4 w-4 text-white" />
                    Newspaper Ad Budget ($1000s)
                  </Label>
                  <Input
                    id="newspaper"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g., 25.8"
                    value={formData.newspaper}
                    onChange={(e) => handleInputChange("newspaper", e.target.value)}
                    className="h-12 text-lg bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:ring-white/50 focus:border-white/50"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 text-lg font-semibold bg-white/90 hover:bg-white text-black border-0 backdrop-blur-sm"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Predicting...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-2 h-5 w-5" />
                        Predict Sales
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="h-12 px-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
                  >
                    Reset
                  </Button>
                </div>
              </form>

              {/* Results Display */}
              {result && (
                <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <h3 className="text-lg font-semibold text-white">Prediction Complete</h3>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    Predicted Sales: ${result.prediction.toFixed(2)} thousand
                  </div>
                  <p className="text-sm text-white/80">
                    This prediction is based on your advertising budget allocation and historical sales data patterns.
                  </p>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <Alert className="mt-6 border border-white/20 bg-white/10 backdrop-blur-md">
                  <AlertCircle className="h-4 w-4 text-white" />
                  <AlertDescription className="text-white">{error}</AlertDescription>
                </Alert>
              )}

              {/* Helper Text */}
              <div className="mt-8 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <h4 className="font-medium text-white mb-2">💡 Tips for Better Predictions</h4>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• Enter budgets in thousands of dollars (e.g., 100 = $100,000)</li>
                  <li>• Typical TV budgets range from 50-300 thousand</li>
                  <li>• Radio budgets typically range from 20-150 thousand</li>
                  <li>• Newspaper budgets usually range from 10-100 thousand</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-white">
          <p className="text-sm">Sales Prediction Tool • Powered by Machine Learning Analytics</p>
        </footer>
      </div>
    </div>
  )
}
