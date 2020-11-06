import { emitter } from '../utils'

 export const replyPermission = async ({ getters, dispatch }, { request, allowed }) => {
   const response = { allowed }
   if (allowed) {
     try {
       response.result = await dispatch('executeRequest', { request })
     } catch (error) {
       response.error = error
     }
   }

   emitter.$emit(`permission:${request.id}`, response)
 }