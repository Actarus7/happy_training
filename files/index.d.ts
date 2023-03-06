import { Request } from "express";
import { StorageEngine } from "multer";

//fonction pour déterminer la destination et le filenames.
//si pas options, fichiers stockés temporairement dans le système.
function diskStorage(options:DiskStorageOptions): StorageEngine;

//retourne un 'StorageEngine' implémenté dans la  mémoire de stockage

function memoryStorage(): StorageEngine;
    
interface DiskStorageOptions {

    /*détermine la destination path pour uploadé le fichier
    * @param req : express Request objet
    *@param file objet contenant le process fichier
    *@param callback détermine la destination path
   */
    
    destination?: string | ((
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void) => void) | undefined;
    
        

}
