export const validate = (values) => {
   const errors = {};
   const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

   if(!values.name){
      errors.name = "Name is required.";

   }else if(!isNaN(values.name)){
      errors.name = "Only characters are allowed!";
   }

   if(!values.email){
      errors.email = "Email is required.";

   }else if(!regex.test(values.email)){
      errors.email = "Enter a valid email."
   }

   return errors;
}  