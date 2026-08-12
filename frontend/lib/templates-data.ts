export type Category =
  | "Sales"
  | "Accounting"
  | "Marketing"
  | "HR"
  | "Operations"
  | "Retail"
  | "Banking"
  | "Media";

export interface DashboardTemplate {
  slug: string;
  title: string;
  category: Category;
  image: string;
  description: string;
  longDescription: string;
  features: string[];
  useCase: string;
  technologies: string[];
}

export const templates: DashboardTemplate[] = [
  {
    slug: "crm-pipeline-analysis",
    title: "CRM Pipeline Analysis",
    category: "Sales",
    image: "/templates/crm-pipeline-analysis.jpg",
    description:
      "A full-funnel view of leads, deal stages, and churn across the sales pipeline.",
    longDescription:
      "This dashboard tracks every lead from first contact through to closed or churned, surfacing exactly where the pipeline narrows. Deal value trends, agent performance, and industry breakdowns sit alongside a geographic view of closed business, so sales leadership can spot bottlenecks before they show up in quarterly numbers.",
    features: [
      "Stage-by-stage customer status pipeline with conversion %",
      "Closed deal value and churn trend by month",
      "Closed deals by organization size, industry, and agent",
      "Geographic breakdown of closed business",
    ],
    useCase:
      "Used by sales operations to run weekly pipeline reviews and spot where deals are stalling before they're lost.",
    technologies: ["Power BI", "DAX", "CRM Connector", "Power Query"],
  },
  {
    slug: "sales-customer-profiling",
    title: "Sales Customer Profiling",
    category: "Sales",
    image: "/templates/sales-customer-profiling.jpg",
    description:
      "Segment customers by purchase behavior and track invoice trends over a rolling three-year window.",
    longDescription:
      "Built for teams that need to understand not just how much customers are buying, but who they are. A rolling time comparison sits above a customer segmentation view that plots total sales against purchase frequency, making it easy to spot which segments are quietly becoming the most valuable.",
    features: [
      "Rolling multi-year sales trend with period comparison",
      "Sales breakdown by product group",
      "Customer segmentation by spend vs. purchase frequency",
      "Ranked customer table by invoice total",
    ],
    useCase:
      "Used by account management teams to identify upsell candidates and flag high-value customers drifting toward churn.",
    technologies: ["Power BI", "DAX", "SQL Server", "Power Query"],
  },
  {
    slug: "inquiry-analysis",
    title: "Sales Inquiry & Quote Analysis",
    category: "Sales",
    image: "/templates/inquiry-analysis.jpg",
    description:
      "Track quote response times and win/loss outcomes from first inquiry to close.",
    longDescription:
      "Every inquiry is followed from creation through to a won, lost, or still-open outcome, with response time tracked at every stage. Breakdowns by hour, weekday, and employee make it easy to see when the team is fastest to respond — and when quotes are quietly going cold.",
    features: [
      "Inquiry status timeline with won / open / lost value in EUR",
      "Average response time by hour and day of week",
      "Funnel view from created to resolved by stage",
      "Inquiry volume by category and employee",
    ],
    useCase:
      "Used by sales managers to coach reps on response speed and protect quote win rates.",
    technologies: ["Power BI", "DAX", "Power Automate", "SQL Server"],
  },
  {
    slug: "used-car-sales",
    title: "Used Car Sales Analysis",
    category: "Sales",
    image: "/templates/used-car-sales.jpg",
    description:
      "A national view of used vehicle sales by type, fuel type, and registration trend.",
    longDescription:
      "Consolidates transaction-level vehicle sales into a single view: current sales against the same period last year, a geospatial breakdown by region, and cross-tabs by vehicle and fuel type. Registration-year drill-downs reveal exactly which model years are moving fastest.",
    features: [
      "Current year and month sales vs. prior period",
      "Geospatial sales distribution by region",
      "Sales by vehicle type and fuel type",
      "Sales trend by registration year and month",
    ],
    useCase:
      "Used by dealership groups to compare regional performance and plan inventory around what's actually selling.",
    technologies: ["Power BI", "DAX", "Power Query", "Azure SQL"],
  },
  {
    slug: "financial-analysis",
    title: "Executive Financial Analysis",
    category: "Accounting",
    image: "/templates/financial-analysis.jpg",
    description:
      "Revenue, EBIT, and net profit tracked against a rolling break-even line.",
    longDescription:
      "A single-page financial summary built for board meetings: revenue, expenses, gross profit, EBIT, and net profit as headline KPIs, with a break-even overlay against net margin. A waterfall view underneath shows exactly how revenue turns into net profit, line by line.",
    features: [
      "Revenue, expenses, gross profit, EBIT, and net profit KPIs",
      "Net profit margin vs. break-even point over time",
      "Full revenue-to-net-profit waterfall",
      "Month-by-month P&L progression",
    ],
    useCase:
      "Presented monthly to the board as the single source of truth for financial performance.",
    technologies: ["Power BI", "DAX", "ERP Connector", "SQL Server"],
  },
  {
    slug: "invoice-explorer",
    title: "Invoice Explorer",
    category: "Accounting",
    image: "/templates/invoice-explorer.jpg",
    description:
      "Search and filter every invoice by amount, status, and location in one live table.",
    longDescription:
      "A searchable invoice register that pairs a step-chart of paid, overdue, and future-due amounts with a world map of where revenue is actually coming from. Filtering by invoice amount or free-text search narrows the detail table instantly, no exports required.",
    features: [
      "Free-text search across invoice number and company",
      "Filter by invoice amount range with a live slider",
      "Paid / overdue / due-in-future breakdown by year",
      "Geographic breakdown of invoice value by country",
    ],
    useCase:
      "Used by accounts receivable teams as their daily working view instead of exporting to Excel.",
    technologies: ["Power BI", "DAX", "ERP Connector", "Power Query"],
  },
  {
    slug: "revenue-vs-budget",
    title: "Revenue vs Budget Tracker",
    category: "Accounting",
    image: "/templates/revenue-vs-budget.jpg",
    description:
      "Compare actual revenue against budget and forecast, broken down by channel and product.",
    longDescription:
      "Budget completion is tracked to the percentage point, with forecast and actuals layered onto the same chart so the gap is impossible to miss. Channel and product breakdowns explain the 'why' behind any variance, down to individual months.",
    features: [
      "Revenue vs. budget vs. forecast, month by month",
      "Budget completion % and year-over-year growth",
      "Revenue vs. budget broken down by channel",
      "Revenue vs. budget broken down by product",
    ],
    useCase:
      "Used in monthly budget review meetings to explain variance to department heads and finance leadership.",
    technologies: ["Power BI", "DAX", "Excel Integration", "SQL Server"],
  },
  {
    slug: "debtor-analysis",
    title: "Debtor & Receivables Analysis",
    category: "Accounting",
    image: "/templates/debtor-analysis.jpg",
    description:
      "Outstanding invoice exposure by age, geography, and product, with overdue amounts flagged.",
    longDescription:
      "Outstanding balances are split into overdue, due-in-future, and due-this-month buckets and plotted against revenue to give a true sense of collection risk. A world map of debtor concentration makes it obvious where exposure is building fastest.",
    features: [
      "Outstanding amount as a % of trailing 12-month revenue",
      "Overdue, due-in-future, and due-this-month breakdown",
      "Debtor concentration by country on a live map",
      "Breakdown by payment status, invoice type, and product",
    ],
    useCase:
      "Used weekly by the credit control team to prioritize collections calls by exposure size.",
    technologies: ["Power BI", "DAX", "ERP Connector", "SQL Server"],
  },
  {
    slug: "marketing-campaign-analysis",
    title: "Marketing Campaign Performance",
    category: "Marketing",
    image: "/templates/marketing-campaign-analysis.jpg",
    description:
      "Impressions, clicks, cost, and profit compared across every ad channel.",
    longDescription:
      "Every channel — Facebook, Instagram, Pinterest — is measured on the same footing: impressions, click-through rate, spend, and resulting profit. Day-of-week patterns and seasonal impression trends make it easy to plan the next flight of spend around when it actually converts.",
    features: [
      "Impressions, clicks, conversions, cost, and profit by channel",
      "Click-through rate compared across channel and device",
      "Ad spend and profit split by channel and ad",
      "Impressions and CTR trend by day of week",
    ],
    useCase:
      "Used by performance marketing teams to reallocate ad budget toward the channels actually driving profit.",
    technologies: ["Power BI", "DAX", "Meta & Pinterest Ads Connector"],
  },
  {
    slug: "app-store-market-research",
    title: "App Store Market Research",
    category: "Marketing",
    image: "/templates/app-store-market-research.jpg",
    description:
      "Market-level research into app pricing, ratings, and category trends.",
    longDescription:
      "A market research view built for product and growth teams sizing up a category before launch: pricing distribution, release trends by year, and which developers and genres dominate the charts, down to language and region breakdowns.",
    features: [
      "Total apps, average rating, and average price benchmarks",
      "Apps released trend by year and month",
      "Top developers and genres by app count",
      "Distribution by language and region",
    ],
    useCase:
      "Used by product teams during market sizing and competitive research ahead of a new app launch.",
    technologies: ["Power BI", "DAX", "Power Query", "Web Scraping Pipeline"],
  },
  {
    slug: "it-support-analysis",
    title: "IT Support Ticket Analysis",
    category: "Operations",
    image: "/templates/it-support-analysis.jpg",
    description:
      "Ticket volume, response time, and resolution rate tracked from creation to close.",
    longDescription:
      "Every ticket is followed through a five-stage funnel — created, first response, resolution, survey, closed — with SLA percentages at each step. Volume breakdowns by topic, product group, and time of day help support leads staff shifts around real demand instead of guesswork.",
    features: [
      "First response and resolution SLA percentages",
      "Ticket volume by topic and product group",
      "Weekday vs. weekend volume patterns by hour",
      "Regional ticket distribution on a live map",
    ],
    useCase:
      "Used by support operations managers to plan staffing and catch SLA slippage before it affects customers.",
    technologies: ["Power BI", "DAX", "Zendesk / Freshdesk Connector"],
  },
  {
    slug: "email-communication-analysis",
    title: "Internal Email Communication Analysis",
    category: "Operations",
    image: "/templates/email-communication-analysis.jpg",
    description:
      "Open rates and communication volume tracked by department and topic.",
    longDescription:
      "Internal comms teams get a clear read on whether messages are actually landing: open rate over time, workday vs. weekend send patterns, and a department-by-seniority breakdown of who's sending and receiving the most. Topic tracking flags what employees are actually emailing about.",
    features: [
      "Emails sent, opened, and open rate over time",
      "Workday vs. weekend sending patterns",
      "Volume by department and seniority level",
      "Top topics and employees for sent email",
    ],
    useCase:
      "Used by internal communications and IT teams to tune the timing and targeting of company-wide announcements.",
    technologies: ["Power BI", "DAX", "Microsoft Graph Connector"],
  },
  {
    slug: "logistics-performance",
    title: "Logistics Shipment Performance",
    category: "Operations",
    image: "/templates/logistics-performance.jpg",
    description:
      "Shipment timeliness, distance, and supplier performance across every route.",
    longDescription:
      "A logistics control tower view: punctuality rate and average transport distance sit alongside a shipments-based-on-timeliness breakdown, so operations teams can see exactly how much of the network is on-time versus early or delayed. Supplier and material views drill down to root cause.",
    features: [
      "Punctuality rate and average transport distance KPIs",
      "Shipments split by on-time, early, and delayed",
      "Top shipments by material and supplier",
      "Regional shipment volume on a live map",
    ],
    useCase:
      "Used by logistics coordinators to hold suppliers accountable and re-route around chronic delays.",
    technologies: ["Power BI", "DAX", "SQL Server", "Power Query"],
  },
  {
    slug: "retail-supply-chain",
    title: "Retail Supply Chain & Sales Analysis",
    category: "Retail",
    image: "/templates/retail-supply-chain.jpg",
    description:
      "Sales, returns, and delivery performance across every state and category.",
    longDescription:
      "Combines sales performance with supply chain health in one place: total sales and lost revenue sit next to average delivery days, so it's obvious when a fast-selling category is being held back by fulfillment delays. State-level breakdowns highlight where supply chain execution is strongest.",
    features: [
      "Total sales, return rate, and lost revenue KPIs",
      "Average delivery days by product category and segment",
      "State and city ranking by supply chain performance",
      "Filterable by region, category, segment, and state",
    ],
    useCase:
      "Used by retail operations teams to connect fulfillment performance directly to sales outcomes.",
    technologies: ["Power BI", "DAX", "Power Query", "SQL Server"],
  },
  {
    slug: "fuel-price-analysis",
    title: "Fuel Price Market Analysis",
    category: "Retail",
    image: "/templates/fuel-price-analysis.jpg",
    description:
      "Regional fuel pricing trends tracked across products and provinces.",
    longDescription:
      "Tracks average, minimum, and maximum fuel prices over time against a province-level map, broken down further by product type. Built to make sharp, sudden price movements visible immediately instead of buried in a raw transaction log.",
    features: [
      "Price trend (max / avg / min) by year",
      "Average price by province on a live map",
      "Price breakdown by product, region, and city",
      "Transaction-level statistical summary (median, std. dev.)",
    ],
    useCase:
      "Used by market analysts and pricing teams tracking regional fuel price volatility.",
    technologies: ["Power BI", "DAX", "Power Query", "SQL Server"],
  },
  {
    slug: "hr-analytics",
    title: "HR Workforce Analytics",
    category: "HR",
    image: "/templates/hr-analytics.jpg",
    description:
      "Headcount, retention, and turnover tracked side by side across the workforce.",
    longDescription:
      "Puts hiring and attrition on the same timeline so trends are easy to compare at a glance: headcount growth against retention rate, and terminations against turnover rate, each with average salary, bonus, tenure, and age broken out beside it.",
    features: [
      "Headcount and retention rate trend over time",
      "New hires per year and month",
      "Terminations and turnover rate trend",
      "Average salary, bonus, tenure, and age benchmarks",
    ],
    useCase:
      "Used by HR leadership in quarterly workforce planning reviews with department heads.",
    technologies: ["Power BI", "DAX", "HRIS Connector", "Power Query"],
  },
  {
    slug: "banking-demographics",
    title: "Banking Customer Demographics",
    category: "Banking",
    image: "/templates/banking-demographics.jpg",
    description:
      "Client age, income, and credit risk profiled across the full customer base.",
    longDescription:
      "Profiles the client base across age, income, and credit score bands, then cross-references that against debt-to-income and overall loan risk categories. Gender splits run through every chart, giving a full picture of who the bank actually serves.",
    features: [
      "Client base segmented by age group and gender",
      "Income and credit score distribution",
      "Debt-to-income (DTI) risk categorization",
      "Overall loan risk score distribution",
    ],
    useCase:
      "Used by retail banking teams to understand portfolio risk concentration and tailor product offers.",
    technologies: ["Power BI", "DAX", "Core Banking Connector", "SQL Server"],
  },
  {
    slug: "music-streaming-trends",
    title: "Music Streaming Trends Analysis",
    category: "Media",
    image: "/templates/music-streaming-trends.jpg",
    description:
      "Decades of streaming data distilled into the tracks, artists, and sounds on top.",
    longDescription:
      "Total streams and playlist presence are tracked back to the 1930s, layered with a danceability-and-energy trend line that shows how the sound of popular music has shifted decade over decade. Leaderboards surface the most-collaborated and most-solo artists side by side.",
    features: [
      "Total streams and playlist presence trend by decade",
      "Danceability and energy trend over time",
      "Most collaborations, most solos, and chart leaderboards",
      "Popular musical key and mode breakdown",
    ],
    useCase:
      "Used by media analysts and playlist curators studying long-run trends in listener taste.",
    technologies: ["Power BI", "DAX", "Streaming API Connector"],
  },
  {
    slug: "movie-industry-insights",
    title: "Movie Industry Insights",
    category: "Media",
    image: "/templates/movie-industry-insights.jpg",
    description:
      "50 years of film releases broken down by runtime, language, and genre.",
    longDescription:
      "Half a century of releases — 1980 through 2030 — distilled into runtime distribution, language and regional spread, and a seasonal release-timing trend. Production company and genre leaderboards make it easy to spot who's actually driving volume in the industry.",
    features: [
      "Runtime distribution across the full release catalog",
      "Release trend by season, decade, and year",
      "Top production companies by number of releases",
      "Top genres by release volume",
    ],
    useCase:
      "Used by media researchers and studios sizing up genre and seasonal release strategy.",
    technologies: ["Power BI", "DAX", "Power Query", "TMDB API Connector"],
  },
  {
    slug: "customer-review-analysis",
    title: "Product Review & Sentiment Analysis",
    category: "Retail",
    image: "/templates/customer-review-analysis.jpg",
    description:
      "Star ratings and review sentiment tracked across product categories and brands.",
    longDescription:
      "Every review is scored for sentiment on both title and body text, then rolled up into rating distribution and recommendation-rate views by product category and brand. Review source breakdowns show whether marketplace or direct-site feedback is driving the score.",
    features: [
      "Sentiment score across review title and body text",
      "Rating distribution and recommendation rate",
      "Review volume by product category and brand",
      "Review source breakdown (marketplace vs. direct)",
    ],
    useCase:
      "Used by product and customer experience teams to flag reputation issues before they show up in returns data.",
    technologies: ["Power BI", "DAX", "NLP Sentiment Pipeline", "Power Query"],
  },
];

export const categories: Category[] = Array.from(
  new Set(templates.map((t) => t.category))
) as Category[];

export function getTemplateBySlug(slug: string) {
  return templates.find((t) => t.slug === slug);
}
