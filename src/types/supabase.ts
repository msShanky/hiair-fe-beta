/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/product": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product.id"];
          created_at?: parameters["rowFilter.product.created_at"];
          code?: parameters["rowFilter.product.code"];
          images?: parameters["rowFilter.product.images"];
          category_id?: parameters["rowFilter.product.category_id"];
          description?: parameters["rowFilter.product.description"];
          title?: parameters["rowFilter.product.title"];
          sub_title?: parameters["rowFilter.product.sub_title"];
          purchase_price?: parameters["rowFilter.product.purchase_price"];
          msrp?: parameters["rowFilter.product.msrp"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["product"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** product */
          product?: definitions["product"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product.id"];
          created_at?: parameters["rowFilter.product.created_at"];
          code?: parameters["rowFilter.product.code"];
          images?: parameters["rowFilter.product.images"];
          category_id?: parameters["rowFilter.product.category_id"];
          description?: parameters["rowFilter.product.description"];
          title?: parameters["rowFilter.product.title"];
          sub_title?: parameters["rowFilter.product.sub_title"];
          purchase_price?: parameters["rowFilter.product.purchase_price"];
          msrp?: parameters["rowFilter.product.msrp"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product.id"];
          created_at?: parameters["rowFilter.product.created_at"];
          code?: parameters["rowFilter.product.code"];
          images?: parameters["rowFilter.product.images"];
          category_id?: parameters["rowFilter.product.category_id"];
          description?: parameters["rowFilter.product.description"];
          title?: parameters["rowFilter.product.title"];
          sub_title?: parameters["rowFilter.product.sub_title"];
          purchase_price?: parameters["rowFilter.product.purchase_price"];
          msrp?: parameters["rowFilter.product.msrp"];
        };
        body: {
          /** product */
          product?: definitions["product"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/product_variant": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product_variant.id"];
          created_at?: parameters["rowFilter.product_variant.created_at"];
          sku?: parameters["rowFilter.product_variant.sku"];
          size?: parameters["rowFilter.product_variant.size"];
          product_id?: parameters["rowFilter.product_variant.product_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["product_variant"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** product_variant */
          product_variant?: definitions["product_variant"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product_variant.id"];
          created_at?: parameters["rowFilter.product_variant.created_at"];
          sku?: parameters["rowFilter.product_variant.sku"];
          size?: parameters["rowFilter.product_variant.size"];
          product_id?: parameters["rowFilter.product_variant.product_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product_variant.id"];
          created_at?: parameters["rowFilter.product_variant.created_at"];
          sku?: parameters["rowFilter.product_variant.sku"];
          size?: parameters["rowFilter.product_variant.size"];
          product_id?: parameters["rowFilter.product_variant.product_id"];
        };
        body: {
          /** product_variant */
          product_variant?: definitions["product_variant"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/product_inventory": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product_inventory.id"];
          created_at?: parameters["rowFilter.product_inventory.created_at"];
          stock?: parameters["rowFilter.product_inventory.stock"];
          variant_id?: parameters["rowFilter.product_inventory.variant_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["product_inventory"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** product_inventory */
          product_inventory?: definitions["product_inventory"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product_inventory.id"];
          created_at?: parameters["rowFilter.product_inventory.created_at"];
          stock?: parameters["rowFilter.product_inventory.stock"];
          variant_id?: parameters["rowFilter.product_inventory.variant_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product_inventory.id"];
          created_at?: parameters["rowFilter.product_inventory.created_at"];
          stock?: parameters["rowFilter.product_inventory.stock"];
          variant_id?: parameters["rowFilter.product_inventory.variant_id"];
        };
        body: {
          /** product_inventory */
          product_inventory?: definitions["product_inventory"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/product_category": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product_category.id"];
          created_at?: parameters["rowFilter.product_category.created_at"];
          category?: parameters["rowFilter.product_category.category"];
          description?: parameters["rowFilter.product_category.description"];
          /** contains the image to be displayed for the category */
          category_image?: parameters["rowFilter.product_category.category_image"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["product_category"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** product_category */
          product_category?: definitions["product_category"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product_category.id"];
          created_at?: parameters["rowFilter.product_category.created_at"];
          category?: parameters["rowFilter.product_category.category"];
          description?: parameters["rowFilter.product_category.description"];
          /** contains the image to be displayed for the category */
          category_image?: parameters["rowFilter.product_category.category_image"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.product_category.id"];
          created_at?: parameters["rowFilter.product_category.created_at"];
          category?: parameters["rowFilter.product_category.category"];
          description?: parameters["rowFilter.product_category.description"];
          /** contains the image to be displayed for the category */
          category_image?: parameters["rowFilter.product_category.category_image"];
        };
        body: {
          /** product_category */
          product_category?: definitions["product_category"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  /** @description Maintains the product information of breeze */
  product: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: numeric */
    code?: number;
    /** Format: ARRAY */
    images?: unknown[];
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `product_category.id`.<fk table='product_category' column='id'/>
     */
    category_id?: number;
    /** Format: character varying */
    description?: string;
    /** Format: text */
    title?: string;
    /** Format: text */
    sub_title?: string;
    /** Format: numeric */
    purchase_price?: number;
    /** Format: numeric */
    msrp?: number;
  };
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /** Format: timestamp with time zone */
    updated_at?: string;
    /** Format: text */
    username?: string;
    /** Format: text */
    avatar_url?: string;
    /** Format: text */
    website?: string;
  };
  /** @description Maintains the product variant of each product */
  product_variant: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: bigint */
    sku?: number;
    /** Format: text */
    size?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `product.id`.<fk table='product' column='id'/>
     */
    product_id?: number;
  };
  /** @description Maintains the product inventory for variants */
  product_inventory: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: bigint */
    stock?: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `product_variant.id`.<fk table='product_variant' column='id'/>
     */
    variant_id?: number;
  };
  /** @description Contains the product category for the boutique */
  product_category: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    category?: string;
    /** Format: text */
    description?: string;
    /**
     * Format: text
     * @description contains the image to be displayed for the category
     */
    category_image?: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description product */
  "body.product": definitions["product"];
  /** Format: bigint */
  "rowFilter.product.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.product.created_at": string;
  /** Format: numeric */
  "rowFilter.product.code": string;
  /** Format: ARRAY */
  "rowFilter.product.images": string;
  /** Format: bigint */
  "rowFilter.product.category_id": string;
  /** Format: character varying */
  "rowFilter.product.description": string;
  /** Format: text */
  "rowFilter.product.title": string;
  /** Format: text */
  "rowFilter.product.sub_title": string;
  /** Format: numeric */
  "rowFilter.product.purchase_price": string;
  /** Format: numeric */
  "rowFilter.product.msrp": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.profiles.updated_at": string;
  /** Format: text */
  "rowFilter.profiles.username": string;
  /** Format: text */
  "rowFilter.profiles.avatar_url": string;
  /** Format: text */
  "rowFilter.profiles.website": string;
  /** @description product_variant */
  "body.product_variant": definitions["product_variant"];
  /** Format: bigint */
  "rowFilter.product_variant.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.product_variant.created_at": string;
  /** Format: bigint */
  "rowFilter.product_variant.sku": string;
  /** Format: text */
  "rowFilter.product_variant.size": string;
  /** Format: bigint */
  "rowFilter.product_variant.product_id": string;
  /** @description product_inventory */
  "body.product_inventory": definitions["product_inventory"];
  /** Format: bigint */
  "rowFilter.product_inventory.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.product_inventory.created_at": string;
  /** Format: bigint */
  "rowFilter.product_inventory.stock": string;
  /** Format: bigint */
  "rowFilter.product_inventory.variant_id": string;
  /** @description product_category */
  "body.product_category": definitions["product_category"];
  /** Format: bigint */
  "rowFilter.product_category.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.product_category.created_at": string;
  /** Format: text */
  "rowFilter.product_category.category": string;
  /** Format: text */
  "rowFilter.product_category.description": string;
  /**
   * Format: text
   * @description contains the image to be displayed for the category
   */
  "rowFilter.product_category.category_image": string;
}

export interface operations {}

export interface external {}
