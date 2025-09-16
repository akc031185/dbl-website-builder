import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db'
import WebsiteRequest from '@/models/WebsiteRequest'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    await connectToDatabase()

    // Build query
    const query: any = {}
    if (status && status !== 'all') {
      query.status = status
    }

    // Get requests with pagination
    const requests = await WebsiteRequest.find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count
    const total = await WebsiteRequest.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: {
        requests,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error) {
    console.error('Error fetching website requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch website requests' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const data = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const updatedRequest = await WebsiteRequest.findByIdAndUpdate(
      id,
      {
        ...data,
        processedAt: data.status === 'completed' ? new Date() : undefined
      },
      { new: true }
    )

    if (!updatedRequest) {
      return NextResponse.json(
        { error: 'Website request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedRequest
    })

  } catch (error) {
    console.error('Error updating website request:', error)
    return NextResponse.json(
      { error: 'Failed to update website request' },
      { status: 500 }
    )
  }
}