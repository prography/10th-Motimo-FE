/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiResponse {
  /** @format int32 */
  code?: number;
  type?: string;
  message?: string;
}

export interface Category {
  /** @format int64 */
  id?: number;
  name?: string;
}

export interface Pet {
  /** @format int64 */
  id?: number;
  category?: Category;
  /** @example "doggie" */
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  /** pet status in the store */
  status?: PetStatusEnum;
}

export interface Tag {
  /** @format int64 */
  id?: number;
  name?: string;
}

export interface Order {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  petId?: number;
  /** @format int32 */
  quantity?: number;
  /** @format date-time */
  shipDate?: string;
  /** Order Status */
  status?: OrderStatusEnum;
  complete?: boolean;
}

export interface User {
  /** @format int64 */
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  /**
   * User Status
   * @format int32
   */
  userStatus?: number;
}

/** pet status in the store */
export enum PetStatusEnum {
  Available = "available",
  Pending = "pending",
  Sold = "sold",
}

/** Order Status */
export enum OrderStatusEnum {
  Placed = "placed",
  Approved = "approved",
  Delivered = "delivered",
}

/** @default "available" */
export enum FindPetsByStatusParamsStatusEnum {
  Available = "available",
  Pending = "pending",
  Sold = "sold",
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://petstore.swagger.io/v2",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title Swagger Petstore
 * @version 1.0.7
 * @license Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)
 * @termsOfService http://swagger.io/terms/
 * @baseUrl https://petstore.swagger.io/v2
 * @externalDocs http://swagger.io
 * @contact <apiteam@swagger.io>
 *
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  pet = {
    /**
     * No description
     *
     * @tags pet
     * @name UploadFile
     * @summary uploads an image
     * @request POST:/pet/{petId}/uploadImage
     * @secure
     * @response `200` `ApiResponse` successful operation
     */
    uploadFile: (
      petId: number,
      data: {
        /** Additional data to pass to server */
        additionalMetadata?: string;
        /** file to upload */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ApiResponse, any>({
        path: `/pet/${petId}/uploadImage`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pet
     * @name AddPet
     * @summary Add a new pet to the store
     * @request POST:/pet
     * @secure
     * @response `405` `void` Invalid input
     */
    addPet: (body: Pet, params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/pet`,
        method: "POST",
        body: body,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags pet
     * @name UpdatePet
     * @summary Update an existing pet
     * @request PUT:/pet
     * @secure
     * @response `400` `void` Invalid ID supplied
     * @response `404` `void` Pet not found
     * @response `405` `void` Validation exception
     */
    updatePet: (body: Pet, params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/pet`,
        method: "PUT",
        body: body,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Multiple status values can be provided with comma separated strings
     *
     * @tags pet
     * @name FindPetsByStatus
     * @summary Finds Pets by status
     * @request GET:/pet/findByStatus
     * @secure
     * @response `200` `(Pet)[]` successful operation
     * @response `400` `void` Invalid status value
     */
    findPetsByStatus: (
      query: {
        /** Status values that need to be considered for filter */
        status: FindPetsByStatusParamsStatusEnum[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<Pet[], void>({
        path: `/pet/findByStatus`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
     *
     * @tags pet
     * @name FindPetsByTags
     * @summary Finds Pets by tags
     * @request GET:/pet/findByTags
     * @deprecated
     * @secure
     * @response `200` `(Pet)[]` successful operation
     * @response `400` `void` Invalid tag value
     */
    findPetsByTags: (
      query: {
        /** Tags to filter by */
        tags: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<Pet[], void>({
        path: `/pet/findByTags`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a single pet
     *
     * @tags pet
     * @name GetPetById
     * @summary Find pet by ID
     * @request GET:/pet/{petId}
     * @secure
     * @response `200` `Pet` successful operation
     * @response `400` `void` Invalid ID supplied
     * @response `404` `void` Pet not found
     */
    getPetById: (petId: number, params: RequestParams = {}) =>
      this.http.request<Pet, void>({
        path: `/pet/${petId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pet
     * @name UpdatePetWithForm
     * @summary Updates a pet in the store with form data
     * @request POST:/pet/{petId}
     * @secure
     * @response `405` `void` Invalid input
     */
    updatePetWithForm: (
      petId: number,
      data: {
        /** Updated name of the pet */
        name?: string;
        /** Updated status of the pet */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<any, void>({
        path: `/pet/${petId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags pet
     * @name DeletePet
     * @summary Deletes a pet
     * @request DELETE:/pet/{petId}
     * @secure
     * @response `400` `void` Invalid ID supplied
     * @response `404` `void` Pet not found
     */
    deletePet: (petId: number, params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/pet/${petId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  store = {
    /**
     * @description Returns a map of status codes to quantities
     *
     * @tags store
     * @name GetInventory
     * @summary Returns pet inventories by status
     * @request GET:/store/inventory
     * @secure
     * @response `200` `Record<string,number>` successful operation
     */
    getInventory: (params: RequestParams = {}) =>
      this.http.request<Record<string, number>, any>({
        path: `/store/inventory`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags store
     * @name PlaceOrder
     * @summary Place an order for a pet
     * @request POST:/store/order
     * @response `200` `Order` successful operation
     * @response `400` `void` Invalid Order
     */
    placeOrder: (body: Order, params: RequestParams = {}) =>
      this.http.request<Order, void>({
        path: `/store/order`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
     *
     * @tags store
     * @name GetOrderById
     * @summary Find purchase order by ID
     * @request GET:/store/order/{orderId}
     * @response `200` `Order` successful operation
     * @response `400` `void` Invalid ID supplied
     * @response `404` `void` Order not found
     */
    getOrderById: (orderId: number, params: RequestParams = {}) =>
      this.http.request<Order, void>({
        path: `/store/order/${orderId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
     *
     * @tags store
     * @name DeleteOrder
     * @summary Delete purchase order by ID
     * @request DELETE:/store/order/{orderId}
     * @response `400` `void` Invalid ID supplied
     * @response `404` `void` Order not found
     */
    deleteOrder: (orderId: number, params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/store/order/${orderId}`,
        method: "DELETE",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name CreateUsersWithListInput
     * @summary Creates list of users with given input array
     * @request POST:/user/createWithList
     * @response `default` `void` successful operation
     */
    createUsersWithListInput: (body: User[], params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/user/createWithList`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUserByName
     * @summary Get user by user name
     * @request GET:/user/{username}
     * @response `200` `User` successful operation
     * @response `400` `void` Invalid username supplied
     * @response `404` `void` User not found
     */
    getUserByName: (username: string, params: RequestParams = {}) =>
      this.http.request<User, void>({
        path: `/user/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description This can only be done by the logged in user.
     *
     * @tags user
     * @name UpdateUser
     * @summary Updated user
     * @request PUT:/user/{username}
     * @response `400` `void` Invalid user supplied
     * @response `404` `void` User not found
     */
    updateUser: (username: string, body: User, params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/user/${username}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This can only be done by the logged in user.
     *
     * @tags user
     * @name DeleteUser
     * @summary Delete user
     * @request DELETE:/user/{username}
     * @response `400` `void` Invalid username supplied
     * @response `404` `void` User not found
     */
    deleteUser: (username: string, params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/user/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name LoginUser
     * @summary Logs user into the system
     * @request GET:/user/login
     * @response `200` `string` successful operation
     * @response `400` `void` Invalid username/password supplied
     */
    loginUser: (
      query: {
        /** The user name for login */
        username: string;
        /** The password for login in clear text */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<string, void>({
        path: `/user/login`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name LogoutUser
     * @summary Logs out current logged in user session
     * @request GET:/user/logout
     * @response `default` `void` successful operation
     */
    logoutUser: (params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/user/logout`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name CreateUsersWithArrayInput
     * @summary Creates list of users with given input array
     * @request POST:/user/createWithArray
     * @response `default` `void` successful operation
     */
    createUsersWithArrayInput: (body: User[], params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/user/createWithArray`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This can only be done by the logged in user.
     *
     * @tags user
     * @name CreateUser
     * @summary Create user
     * @request POST:/user
     * @response `default` `void` successful operation
     */
    createUser: (body: User, params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/user`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),
  };
}
