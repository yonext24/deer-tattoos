import { NextRequest, NextResponse } from 'next/server'

export type NextFunction = () => void
export type Middleware = (
  request: ParsedRequest,
  next: NextFunction,
) => Promise<Response | void>

export const handler =
  (...middleware: Middleware[]) =>
  async (request: NextRequest) => {
    let result
    let pReq: ParsedRequest = new ParsedRequest(request)

    for (let i = 0; i < middleware.length; i++) {
      let nextInvoked = false

      const next: NextFunction = async () => {
        nextInvoked = true
      }

      try {
        result = await middleware[i](pReq, next)

        if (result) break
      } catch (error) {
        const { code, message } = parseError(error)

        return NextResponse.json({ error: message }, { status: code })
      }

      if (!nextInvoked) {
        break
      }
    }

    if (result) return result

    throw new Error('Your handler or middleware must return a NextResponse!')
  }

const parseError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      code: 500,
      message: error.message ?? 'Algo salió mal',
    }
  }

  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
    }
  }

  return {
    code: 500,
    message: 'Algo salió mal',
  }
}

export class AppError {
  constructor(
    public code: number,
    public message: string,
  ) {
    this.code = code
    this.message = message
  }

  static badFormat = () => new AppError(400, 'Formato incorrecto')
}

export class ParsedRequest extends NextRequest {
  private _parsedBody: { [key: string]: any } = {}

  private _hasBeenParsed = false
  private _cloned: Request

  constructor(req: NextRequest) {
    const cloned = req.clone()

    super(req)

    this._cloned = cloned
  }

  async parsedBody(
    type: 'json' | 'formData' = 'json',
  ): Promise<typeof this._parsedBody> {
    if (this._hasBeenParsed) return this._parsedBody

    if (type === 'formData') {
      const formData = await this._cloned.formData()

      for (const [key, value] of formData.entries()) {
        this._parsedBody[key] = value
      }

      this._hasBeenParsed = true

      return this._parsedBody
    }
    this._parsedBody = await this._cloned.json()
    this._hasBeenParsed = true

    return this._parsedBody
  }
}
