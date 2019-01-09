import * as cloudinary from 'cloudinary';
import { createWriteStream, unlinkSync } from 'fs';

import { ApolloError } from 'apollo-server';
import { MutationResolvers } from '../generated/graphql-resolvers';

interface IFileStream {
  createReadStream: any;
  filename: string;
  mimetype: string;
  encoding: string;
}

const storeUpload = async (stream: any, filename: string): Promise<{ filepath: string }> => {
  const id = '12345';
  const filepath = `images/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filepath))
      .on('finish', () => resolve({ filepath }))
      .on('error', reject)
  );
};

const processUpload = async (file: IFileStream): Promise<{ filepath: string }> => {
  try {
    const { createReadStream, filename, mimetype, encoding }: IFileStream = await file;
    const stream = createReadStream();
    const { filepath } = await storeUpload(stream, filename);
    return { filepath };
  } catch (err) {
    throw new Error(err);
  }
};

export const uploadMutationResolver: MutationResolvers.Resolvers = {
  uploadImage: async (parent, { file, calendarId }, { models, me }) => {
    const { filepath } = await processUpload(file);

    try {
      const result = await cloudinary.v2.uploader.upload(filepath, { folder: 'Adventcalendar' });
      unlinkSync(filepath);
      models.Calendar.update({ image_url: result.secure_url }, { where: { userId: me.id, id: calendarId } });
      return result.secure_url;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Saving failed... Please try again...', 'SAVING_FAILED');
    }
  },
  deleteImage: async (parent, { publicId, calendarId }, { models, me }) => {
    try {
      const { result } = await cloudinary.v2.uploader.destroy(`Adventcalendar/${publicId}`, { resource_type: 'image' });
      if (result === 'ok') {
        const updated = await models.Calendar.update({ image_url: null }, { where: { id: calendarId, userId: me.id } });
        return updated[0] === 1;
      } else {
        return false;
      }
    } catch (err) {
      throw new ApolloError("Couldn't delete image, please try again...", 'DELETE_FAILED');
    }
  }
};
