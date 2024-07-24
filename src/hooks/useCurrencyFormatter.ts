import { useMemo } from 'react';

// Function to determine the currency symbol based on locale
const getCurrencyFormatter = (locale: string) => {
    // Default to USD if no match is found
    let currency = 'USD';

    // List of EU countries and their respective currencies
    const euCurrencies: { [key: string]: string } = {
        'AT': 'EUR', // Austria
        'BE': 'EUR', // Belgium
        'BG': 'BGN', // Bulgaria
        'CY': 'EUR', // Cyprus
        'CZ': 'CZK', // Czech Republic
        'DE': 'EUR', // Germany
        'DK': 'DKK', // Denmark
        'EE': 'EUR', // Estonia
        'FI': 'EUR', // Finland
        'FR': 'EUR', // France
        'GR': 'EUR', // Greece
        'HU': 'HUF', // Hungary
        'IE': 'EUR', // Ireland
        'IT': 'EUR', // Italy
        'LT': 'EUR', // Lithuania
        'LU': 'EUR', // Luxembourg
        'MT': 'EUR', // Malta
        'NL': 'EUR', // Netherlands
        'PL': 'PLN', // Poland
        'PT': 'EUR', // Portugal
        'RO': 'RON', // Romania
        'SK': 'EUR', // Slovakia
        'SI': 'EUR', // Slovenia
        'ES': 'EUR', // Spain
        'SE': 'SEK', // Sweden
    };

    // Extract the country code from the locale
    const countryCode = locale.split('-')[1]?.toUpperCase() || '';

    // Determine the currency based on the locale
    if (countryCode in euCurrencies) {
        currency = euCurrencies[countryCode];
    } else if (locale.startsWith('jp')) {
        currency = 'JPY'; // Japanese Yen for Japan
    } else if (locale.startsWith('cn')) {
        currency = 'CNY'; // Chinese Yuan for China
    } else if (locale.startsWith('us')) {
        currency = 'USD'; // US Dollar for United States
    } else if (locale.startsWith('gb')) {
        currency = 'GBP'; // British Pound for United Kingdom
    }

    // Create the formatter
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    });

    // Extract the currency symbol
    const symbol = formatter.formatToParts(0).find(part => part.type === 'currency')?.value || '';

    return {
        format: formatter.format,
        symbol
    };
};

// Hook to provide a currency formatter based on the user's locale
const useCurrencyFormatter = (locale?: string) => {
    // Use the provided locale or fallback to the user's locale
    const userLocale = locale || navigator.language || 'en-US';

    return useMemo(() => getCurrencyFormatter(userLocale), [userLocale]);
};

export default useCurrencyFormatter;
