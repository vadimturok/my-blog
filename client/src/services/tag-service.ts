import api from "../http";
import {ITag} from "../types/tag-type";
import {AxiosResponse} from "axios";

export default class TagService{
    static async createTag(name: string, description: string, color: string){
        return api.post<ITag>('/tags', {name, description, color})
    }

    static async getTags(): Promise<AxiosResponse<ITag[]>>{
        return api.get<ITag[]>('/tags')
    }

    static async getTagById(tagId: number): Promise<AxiosResponse<ITag>>{
        return api.get<ITag>(`/tags/tag/${tagId}`)
    }
}