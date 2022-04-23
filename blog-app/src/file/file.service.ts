import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'
import {storageRef} from "../main";


@Injectable()
export class FileService{
    async createFile(file): Promise<string>{
        try{
            const fileExtension = file.originalname.split('.').pop()
            const fileName = uuid.v4() + '.' + fileExtension
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

            return this.uploadToFirebase(filePath, fileName);
        }catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async uploadToFirebase(filePath: string, fileName: string){
        const response = await storageRef.upload(`${filePath}/${fileName}`,{
            public: true,
            destination: `/posts/${fileName}`
        })
        return response[0].metadata.mediaLink
    }
}