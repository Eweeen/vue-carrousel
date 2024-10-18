/**
 * Permet de mettre en pause l'exécution du code
 *
 * @param {number} ms - Temps en millisecondes
 * @returns {Promise<void>} - Promesse résolue après le temps donné
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
