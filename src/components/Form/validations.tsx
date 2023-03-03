import * as yup from 'yup';


const valitadions = yup.object({
      publicKey: yup.string().min(5).required(),
      comPublicKey: yup.string().required(),
      product: yup.string().required(),
      period: yup.string().required(), 
      cost:yup.number().required()
})

export default valitadions;