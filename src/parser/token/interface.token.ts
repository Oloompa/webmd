import { TokenCategory } from "./enum.token_category.ts";

export interface Token {
    type: TokenCategory;
    characters: string;
}
