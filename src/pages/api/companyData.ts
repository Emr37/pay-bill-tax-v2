import nextConfig from 'next.config';


export const companyData = [
        {product: "Water", period: "January", cost: 0.005, companyPrivateKey: nextConfig.env.ISKI_PRIVATE_KEY},
        {product: "Electricity", period: "January", cost: 0.007, companyPrivateKey: nextConfig.env.BEDAS_PRIVATE_KEY}    
    ]
