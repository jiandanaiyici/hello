import { request  } from "@/utils";
import { viewUrl } from "./contant";

export function queryXmlDataService() {
  return request(viewUrl);
}