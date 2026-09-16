/**
 * Safe, typed events for the Google Analytics 4 property configured in
 * src/routes/__root.tsx. Automatic pageviews remain owned by the existing
 * gtag config; this module only sends the interaction and outcome events
 * listed below.
 */

import type { ProductId } from './products'

export type { ProductId } from './products'

export type AffiliatePartner =
  | 'itrustcapital'
  | 'ellipal'
  | 'uphold'
  | 'tangem'
  | 'ledger'
  | 'caleb_brown'

export type SocialPlatform = 'youtube' | 'tiktok' | 'facebook'

export type ThreeAction = 'shop' | 'opportunity' | 'enroll'
export type ThreeProduct = 'vitalite' | 'visage' | 'kynetik'

export type ResourceId =
  | 'crypto_inheritance_checklist'
  | 'crypto_inheritance_workbook'
  | 'beneficiary_access_template'
  | 'asset_protection_guide'
  | 'trust_titling_checklist'
  | 'xrp_essentials_guide'
  | 'xrp_ripple_book'
  | 'ellipal_setup_guide'
  | 'tangem_beginners_guide'
  | 'crypto_mastery_ebook'

export type VideoId =
  | 'youtube_channel'
  | 'ellipal_setup'
  | 'tangem_beginner'

export type ServiceId = 'asset_protection' | 'digital_asset_guidance' | 'general_consultation'

export type ProductCheckoutPlacement =
  | 'homepage_bundle'
  | 'guides_featured_bundle'
  | 'guides_individual'
  | 'videos_masterclass'
  | 'crypto_mastery_hero'
  | 'crypto_mastery_bottom'

export type AffiliatePlacement =
  | 'homepage_tools'
  | 'partners_recommended_tools'
  | 'partners_platforms'
  | 'videos_masterclass'
  | 'videos_recommended_tools'
  | 'downloads_upsell'
  | 'blog_article'

export type ServiceCheckoutPlacement =
  | 'service_details_asset_protection'
  | 'service_details_digital_asset'
  | 'services_ready'

export type ThreePlacement =
  | 'homepage_three_section'
  | 'three_hero'
  | 'three_product_card'
  | 'three_opportunity'

export type SocialPlacement =
  | 'homepage_social'
  | 'global_footer'
  | 'partners_video_section'
  | 'videos_header'
  | 'squad_hero'

export type VideoPlacement =
  | 'videos_header'
  | 'videos_recommended_tools'
  | 'downloads_library'
  | 'squad_hero'

export type ResourcePlacement =
  | 'downloads_library'
  | 'partners_recommended_tools'
  | 'partners_platforms'
  | 'partners_free_guides'
  | 'videos_recommended_tools'
  | 'thank_you_delivery'

export type LeadForm = 'caregiver_checklist' | 'crypto_checklist' | 'crypto_security_checklist' | 'sentinel_squad_notify'
export type LeadPlacement =
  | 'homepage_caregiver'
  | 'homepage_crypto'
  | 'crypto_checklist_page'
  | 'sentinel_squad_page'

export type AnalyticsParameters = {
  product_checkout_click: {
    product_id: ProductId
    placement: ProductCheckoutPlacement
  }
  service_checkout_click: {
    service_id: ServiceId
    placement: ServiceCheckoutPlacement
  }
  affiliate_link_click: {
    partner: AffiliatePartner
    placement: AffiliatePlacement
  }
  three_link_click: {
    action: ThreeAction
    placement: ThreePlacement
    featured_product_id?: ThreeProduct
  }
  social_link_click: {
    platform: SocialPlatform
    placement: SocialPlacement
  }
  video_link_click: {
    video_id: VideoId
    placement: VideoPlacement
  }
  resource_download_click: {
    resource: ResourceId
    placement: ResourcePlacement
  }
  lead_form_success: {
    form_name: LeadForm
    placement: LeadPlacement
  }
  contact_form_success: {
    placement: 'contact_page'
  }
}

export type AnalyticsEventName = keyof AnalyticsParameters

type AnalyticsPrimitive = string | number | boolean
type GtagParameters = Record<string, AnalyticsPrimitive>

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, parameters?: GtagParameters) => void
    'ga-disable-G-Q6SKVDVTMJ'?: boolean
  }
}

const EVENT_KEYS: { [E in AnalyticsEventName]: readonly string[] } = {
  product_checkout_click: ['product_id', 'placement'],
  service_checkout_click: ['service_id', 'placement'],
  affiliate_link_click: ['partner', 'placement'],
  three_link_click: ['action', 'placement', 'featured_product_id'],
  social_link_click: ['platform', 'placement'],
  video_link_click: ['video_id', 'placement'],
  resource_download_click: ['resource', 'placement'],
  lead_form_success: ['form_name', 'placement'],
  contact_form_success: ['placement'],
}

const REQUIRED_KEYS: { [E in AnalyticsEventName]: readonly string[] } = {
  product_checkout_click: ['product_id', 'placement'],
  service_checkout_click: ['service_id', 'placement'],
  affiliate_link_click: ['partner', 'placement'],
  three_link_click: ['action', 'placement'],
  social_link_click: ['platform', 'placement'],
  video_link_click: ['video_id', 'placement'],
  resource_download_click: ['resource', 'placement'],
  lead_form_success: ['form_name', 'placement'],
  contact_form_success: ['placement'],
}

const PLACEMENT_VALUES: { [E in AnalyticsEventName]: ReadonlySet<string> } = {
  product_checkout_click: new Set<ProductCheckoutPlacement>([
    'homepage_bundle',
    'guides_featured_bundle',
    'guides_individual',
    'videos_masterclass',
    'crypto_mastery_hero',
    'crypto_mastery_bottom',
  ]),
  service_checkout_click: new Set<ServiceCheckoutPlacement>([
    'service_details_asset_protection',
    'service_details_digital_asset',
    'services_ready',
  ]),
  affiliate_link_click: new Set<AffiliatePlacement>([
    'homepage_tools',
    'partners_recommended_tools',
    'partners_platforms',
    'videos_masterclass',
    'videos_recommended_tools',
    'downloads_upsell',
    'blog_article',
  ]),
  three_link_click: new Set<ThreePlacement>([
    'homepage_three_section',
    'three_hero',
    'three_product_card',
    'three_opportunity',
  ]),
  social_link_click: new Set<SocialPlacement>([
    'homepage_social',
    'global_footer',
    'partners_video_section',
    'videos_header',
    'squad_hero',
  ]),
  video_link_click: new Set<VideoPlacement>([
    'videos_header',
    'videos_recommended_tools',
    'downloads_library',
    'squad_hero',
  ]),
  resource_download_click: new Set<ResourcePlacement>([
    'downloads_library',
    'partners_recommended_tools',
    'partners_platforms',
    'partners_free_guides',
    'videos_recommended_tools',
    'thank_you_delivery',
  ]),
  lead_form_success: new Set<LeadPlacement>([
    'homepage_caregiver',
    'homepage_crypto',
    'crypto_checklist_page',
    'sentinel_squad_page',
  ]),
  contact_form_success: new Set(['contact_page']),
}

const ALLOWED_VALUES = {
  product_id: new Set<ProductId>([
    'crypto-inheritance-bundle',
    'asset-protection-guide',
    'complete-bundle',
    'crypto-inheritance-masterclass',
    'crypto-mastery',
  ]),
  service_id: new Set<ServiceId>(['asset_protection', 'digital_asset_guidance', 'general_consultation']),
  partner: new Set<AffiliatePartner>([
    'itrustcapital',
    'ellipal',
    'uphold',
    'tangem',
    'ledger',
    'caleb_brown',
  ]),
  action: new Set<ThreeAction>(['shop', 'opportunity', 'enroll']),
  featured_product_id: new Set<ThreeProduct>(['vitalite', 'visage', 'kynetik']),
  platform: new Set<SocialPlatform>(['youtube', 'tiktok', 'facebook']),
  video_id: new Set<VideoId>(['youtube_channel', 'ellipal_setup', 'tangem_beginner']),
  resource: new Set<ResourceId>([
    'crypto_inheritance_checklist',
    'crypto_inheritance_workbook',
    'beneficiary_access_template',
    'asset_protection_guide',
    'trust_titling_checklist',
    'xrp_essentials_guide',
    'xrp_ripple_book',
    'ellipal_setup_guide',
    'tangem_beginners_guide',
    'crypto_mastery_ebook',
  ]),
  form_name: new Set<LeadForm>([
    'caregiver_checklist',
    'crypto_checklist',
    'crypto_security_checklist',
    'sentinel_squad_notify',
  ]),
} as const

function isAllowedValue(key: string, value: unknown): value is AnalyticsPrimitive {
  if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') return false
  if (typeof value === 'number' && !Number.isFinite(value)) return false

  const allowed = ALLOWED_VALUES[key as keyof typeof ALLOWED_VALUES]
  if (allowed) return allowed.has(value as never)

  return typeof value === 'boolean' || (typeof value === 'string' && value.length <= 64)
}

function isSafeParameters(eventName: AnalyticsEventName, parameters: unknown): parameters is GtagParameters {
  if (!parameters || typeof parameters !== 'object' || Array.isArray(parameters)) return false

  const record = parameters as Record<string, unknown>
  const allowedKeys = EVENT_KEYS[eventName]
  const requiredKeys = REQUIRED_KEYS[eventName]
  if (!allowedKeys || !requiredKeys) return false
  const keys = Object.keys(record)
  if (keys.some((key) => !allowedKeys.includes(key))) return false
  if (requiredKeys.some((key) => record[key] === undefined)) return false
  if (typeof record.placement !== 'string' || !PLACEMENT_VALUES[eventName].has(record.placement)) return false

  for (const key of allowedKeys) {
    if (record[key] !== undefined && !isAllowedValue(key, record[key])) return false
  }

  return true
}

/**
 * Dispatch an allowlisted event without ever allowing analytics to affect
 * navigation, downloads, checkout, or form handling.
 */
export function trackEvent<E extends AnalyticsEventName>(eventName: E, parameters: AnalyticsParameters[E]): void {
  if (typeof window === 'undefined') return
  if (window['ga-disable-G-Q6SKVDVTMJ'] === true) return
  if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') return
  if (!isSafeParameters(eventName, parameters)) return

  const gtag = window.gtag
  if (!gtag) return

  try {
    const safeParameters = Object.fromEntries(
      Object.entries(parameters).filter(([, value]) => value !== undefined),
    ) as GtagParameters
    gtag('event', eventName, safeParameters)
  } catch {
    // Analytics failures must never break the user's action.
  }
}