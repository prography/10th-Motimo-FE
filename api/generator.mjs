import { generateApi } from "swagger-typescript-api";
import path from "path";
import fs from "fs";

// .env 파일의 환경 변수를 로드.
import "dotenv/config";

const generate = async (domain, url) => {
  const PATH_TO_OUTPUT_DIR = path.resolve(
    process.cwd(),
    `./api/generated/${domain}`,
  );

  if (fs.existsSync(PATH_TO_OUTPUT_DIR)) {
    console.log("🧹   Removing old generated files...");
    fs.rmSync(PATH_TO_OUTPUT_DIR, { recursive: true, force: true });
  }

  generateApi({
    output: PATH_TO_OUTPUT_DIR,
    url,
    httpClientType: "fetch", // or "fetch"
    defaultResponseAsSuccess: false,
    generateClient: true,
    generateRouteTypes: false,
    generateResponses: true,
    toJS: false,
    extractRequestParams: false,
    extractRequestBody: false,
    extractResponseBody: false,
    extractResponseError: false,
    extractEnums: true,
    unwrapResponseData: true,
    defaultResponseType: "void",
    singleHttpClient: true,
    cleanOutput: false,
    enumNamesAsValues: false,
    moduleNameFirstTag: true,
    moduleNameIndex: 0,
    generateUnionEnums: false,
    typePrefix: "",
    typeSuffix: "",
    enumKeyPrefix: "",
    enumKeySuffix: "",
    addReadonly: false,
    sortTypes: false,
    sortRoutes: false,
    fixInvalidTypeNamePrefix: "Type",
    fixInvalidEnumKeyPrefix: "Value",
  });
};

// generate("example", "https://petstore.swagger.io/v2/swagger.json");
generate("motimo", process.env.SWAGGER_URL);
