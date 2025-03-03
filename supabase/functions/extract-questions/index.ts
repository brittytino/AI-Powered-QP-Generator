
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createWorker } from 'https://esm.sh/tesseract.js@5.0.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      throw new Error('No image file provided')
    }

    // Initialize Tesseract.js worker
    const worker = await createWorker()
    
    // Configure worker for math recognition
    await worker.loadLanguage('eng+equ')
    await worker.initialize('eng+equ')
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789+-*/.()=√πΣ∫',
      preserve_interword_spaces: '1',
    })

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    
    // Extract text from image
    const { data: { text } } = await worker.recognize(arrayBuffer)
    console.log('Extracted text:', text)
    
    // Terminate worker
    await worker.terminate()

    // Process and format the extracted text
    const processedText = postProcessMathText(text)
    console.log('Processed text:', processedText)

    return new Response(
      JSON.stringify({ text: processedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

function postProcessMathText(text: string): string {
  return text
    // Clean up common OCR issues with mathematical symbols
    .replace(/\s+/g, ' ')
    .replace(/([0-9])\s+([+\-*/()=])\s+([0-9])/g, '$1$2$3')
    .replace(/(\d)\s+\.\s+(\d)/g, '$1.$2')
    .replace(/[∑∫]\s+/g, (match) => match.trim())
    // Convert basic mathematical symbols to LaTeX
    .replace(/sqrt/g, '\\sqrt')
    .replace(/pi/g, '\\pi')
    .replace(/sum/g, '\\sum')
    .replace(/int/g, '\\int')
    .replace(/([0-9]+)\^([0-9]+)/g, '$1^{$2}')
    .trim()
}
