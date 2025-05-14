import { APIRequestContext, APIResponse } from '@playwright/test';


export class PostsAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async getAllPosts(): Promise<APIResponse> {
    return this.request.get(`/posts`);
  }
  async getPostById(id: number): Promise<APIResponse> {
    return this.request.get(`/posts/${id}`);
  }
  async createPost(payload: {
    title: string;
    body: string;
    userId: number;
  }): Promise<APIResponse> {
    return this.request.post(`/posts`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json, charset=utf-8'
      }
    });
  }

  async updatePost(payload: {
    id: number;
    title: string;
    body: string;
    userId: number;
  }): Promise<APIResponse> {
    return this.request.put(`/posts/${payload.id}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json, charset=utf-8'
      }
    });
  }

  async deletePost(id: number): Promise<APIResponse> {
    return this.request.delete(`/posts/${id}`);
  }
}
