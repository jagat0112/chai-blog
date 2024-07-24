import config from "../config/config";
import { Client, Storage, Databases, ID, Query } from "appwrite";

class Service {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    content,
    slug,
    featuredImage,
    status = "false",
    userId,
    author,
  }) {
    try {
      await this.database.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId, author }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    await this.database.updateDocument(
      config.appWriteDatabaseId,
      config.appWriteCollectionId,
      slug,
      { title, content, featuredImage, status, userId }
    );
  }
  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getDocument(slug) {
    await this.database.getDocument(
      config.appWriteDatabaseId,
      config.appWriteCollectionId,
      slug
    );
  }

  async getDocuments(queries = []) {
    return await this.database.listDocuments(
      config.appWriteDatabaseId,
      config.appWriteCollectionId,
      queries
    );
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appWriteBacketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appWriteBacketId, fileId);
      console.log("File Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async previewFile(fileId) {
    try {
      return await this.bucket.getFilePreview(config.appWriteBacketId, fileId);
    } catch (error) {
      console.log(error);
    }
  }
  async getUser(userId) {
    await this.users.get(userId);
  }
}

const service = new Service();

export default service;
