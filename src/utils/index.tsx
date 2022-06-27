export const capitalize = (str: string):string => {
  if (str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  return "";
};

export const formatCpf = (cpf: string):string => {
  if (cpf) {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return "";
};

export const formatCep = (cep: string):string => {
  if (cep) {
    cep = cep.replace(/[^\d]/g, "");
    return cep.replace(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/, "$1$2-$3");
  }
  return "";
};

export const formatPhone = (phone: string):string => {
  if (phone) {
    phone = phone.replace(/[^0-9]/g, "").slice(0, 11);  
    return phone.replace(/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/, "($1) $2-$3");
  }
  return "";
};
