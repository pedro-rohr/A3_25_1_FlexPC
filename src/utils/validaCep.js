//validador de cep
export const validaCep = (cep) => {
  const cleanedCep = cep.replace(/\D/g, '');
  if (cleanedCep.length !== 8) {
    return false;
  }
  if (cleanedCep[0] === '0') {
    return false;
  }
  return true;
};
