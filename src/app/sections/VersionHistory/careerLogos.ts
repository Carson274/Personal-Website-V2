const CAREER_LOGO_BY_NAME: Record<string, string> = {
    CASS: '/images/logos/CASS_logo.png',
    ACM: '/images/logos/ACM_logo.png',
    Workiva: '/images/logos/Workiva_logo.webp',
    Netflix: '/images/logos/Netflix_logo.webp',
};

export function getCareerLogoSrc(companyName: string): string | undefined {
    return CAREER_LOGO_BY_NAME[companyName];
}
