import * as yup from 'yup';


const valitadions = yup.object({
      comPublicKey: yup.string().required(),
      product: yup.string().required(),
      period: yup.string().required(), 
      cost:yup.number().required()
})

export default valitadions;