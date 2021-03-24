import {isEmpty} from 'lodash';
import { Model, ObjectId } from 'mongoose';

export type BaseEntity = {
  readonly _id?: ObjectId
}

type Error = {
  readonly path: string,
  readonly message: string;
};

export type TransactionResults = {
  readonly errors;
  readonly object;
};

export type Conditions = {
  readonly [field: string]: string
};

export type GetEntityArguments = {
  readonly id?: string;
  readonly conditions?: Conditions;
};

export function convertErrorToObject(errors) {
  if (isEmpty(errors)) {
    return {};
  }

  const simplifiedErrors = {};

  Object.values(errors).forEach((error: Error) => {
    const {message, path} = error;

    // @ts-ignore
    simplifiedErrors[[path]] = message;
  });

  return simplifiedErrors;
}

export async function createObject(entityInterface: Model<any>, objectToInsert: BaseEntity): Promise<TransactionResults> {
  try {
    const createdObject = await entityInterface.create(objectToInsert);
    return {errors: null, object: createdObject};
  } catch ({name, errors, message}) {

    if (name === 'MongoError') {
      return {errors: message, object: null};
    }

    return {errors: convertErrorToObject(errors), object: null}
  }
}

export async function getObject(entityInterface: Model<any>, {id, conditions}: GetEntityArguments) {

  if (id) {
    return entityInterface.findById({_id: id});
  }

  if (conditions) {
    return entityInterface.find(conditions);
  }

  throw new Error('You need to pass an ID or conditions');
}
