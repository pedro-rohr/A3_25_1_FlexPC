export const calcularDiasAluguel = (dataInicioStr, dataFimStr) => {
  console.log(`Calculando dias de aluguel entre ${dataInicioStr} e ${dataFimStr}`);
  
  function parseData(dataStr) {
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
  }
  
  const dataInicio = parseData(dataInicioStr);
  const dataFim = parseData(dataFimStr);
  
  if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
    return 0;
  }
  
  if (dataFim <= dataInicio) {
    return 0;
  }
  
  const diffMs = dataFim - dataInicio;
  const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  return diffDias;
}

export const isValidDate = (dateStr) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateStr)) {
    return false;
  }
  
  const [dia, mes, ano] = dateStr.split('/').map(Number);
  
  if (mes < 1 || mes > 12) {
    return false;
  }
  
  if (dia < 1 || dia > 31) {
    return false;
  }
  
  if (ano < 1900 || ano > 2100) {
    return false;
  }

  const date = new Date(ano, mes - 1, dia);

  return date.getDate() === dia && 
         date.getMonth() === mes - 1 && 
         date.getFullYear() === ano;
}