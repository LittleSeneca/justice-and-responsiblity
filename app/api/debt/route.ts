import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch debt data from Treasury API
    const debtResponse = await fetch(
      'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=1',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Justice-and-Responsibility-Charter/1.0'
        }
      }
    )

    if (!debtResponse.ok) {
      throw new Error(`Treasury API error: ${debtResponse.status}`)
    }

    const debtData = await debtResponse.json()
    
    // Fetch population data from Census API
    const popResponse = await fetch(
      'https://api.census.gov/data/2023/pep/charv?get=POP&for=us:*&YEAR=2023',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Justice-and-Responsibility-Charter/1.0'
        }
      }
    )

    if (!popResponse.ok) {
      throw new Error(`Census API error: ${popResponse.status}`)
    }

    const popData = await popResponse.json()

    // Process the data
    let debt = 36100000000000 // fallback
    let population = 336000000 // fallback

    if (debtData.data && debtData.data.length > 0) {
      const latestDebt = parseFloat(debtData.data[0].tot_pub_debt_out_amt)
      if (!isNaN(latestDebt)) {
        debt = latestDebt
      }
    }

    if (popData && popData.length > 1 && popData[1][0]) {
      const latestPop = parseInt(popData[1][0])
      if (!isNaN(latestPop)) {
        population = latestPop
      }
    }

    return NextResponse.json({
      debt,
      population,
      debtPerPerson: debt / population,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching debt/population data:', error)
    
    // Return fallback data
    const debt = 36100000000000
    const population = 336000000
    
    return NextResponse.json({
      debt,
      population,
      debtPerPerson: debt / population,
      timestamp: new Date().toISOString(),
      fallback: true
    })
  }
}