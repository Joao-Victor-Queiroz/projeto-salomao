export function pegarPrimeiroEUltimoNome(nomeCompleto: string): string {
  const partes = nomeCompleto.trim().split(/\s+/);

  if (partes.length === 0) return "";
  if (partes.length === 1) return partes[0];

  const primeiro = partes[0];
  const ultimo = partes[partes.length - 1];

  return `${primeiro} ${ultimo}`;
}
