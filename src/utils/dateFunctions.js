export const  calcularDiasAluguel = (dataInicioStr, dataFimStr)  => {

  console.log(`Calculando dias de aluguel entre ${dataInicioStr} e ${dataFimStr}`);


  function parseData(dataStr) {
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
  }
  const dataInicio = parseData(dataInicioStr);
  const dataFim = parseData(dataFimStr);
  const diffMs = dataFim - dataInicio;
  const diffDias = diffMs / (1000 * 60 * 60 * 24);
  return diffDias;
}

export const isValidDate = (dateStr) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/
  if (!regex.test(dateStr)) {
    return false
  }
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    return false
  }

  return true
}
