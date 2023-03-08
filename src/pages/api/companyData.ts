import nextConfig from 'next.config';


export const companyData = [
        {product: "Water", period: "January", cost: 0.005, companyPrivateKey: nextConfig.env.ISKI_PRIVATE_KEY},
        {product: "Electricity", period: "January", cost: 0.007, companyPrivateKey: nextConfig.env.BEDAS_PRIVATE_KEY},
        {product: "Water", period: "January", cost: 0.005, companyPrivateKey: nextConfig.env.ISKI_PRIVATE_KEY},
        {product: "Electricity", period: "January", cost: 0.007, companyPrivateKey: nextConfig.env.BEDAS_PRIVATE_KEY},
        {product: "Gas", period: "February", cost: 0.009, companyPrivateKey: nextConfig.env.IGDAS_PRIVATE_KEY}       
    ]
