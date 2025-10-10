# API Integration Guide

This project includes a comprehensive API integration setup using Axios and SWR for efficient data fetching and caching.

## 📁 File Structure

```
src/lib/api/
├── config.js          # API configuration and endpoints
├── client.js          # Axios client setup with interceptors
├── services.js        # API service functions for each endpoint
├── hooks.js           # SWR hooks for data fetching
└── index.js           # Main exports
```

## 🚀 Quick Start

### 1. Import the hooks you need

```jsx
import { useSettingsAsObject, useKPIs, useCompanies } from "@/lib/api";
```

### 2. Use in your components

```jsx
function MyComponent() {
  const { settings, isLoading, isError } = useSettingsAsObject("en"); // or "ar"
  const { kpis } = useKPIs("en");
  const { companies } = useCompanies("en");

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorBoundary error={isError} />;

  return (
    <div>
      <h1>{settings?.brand_name_ar}</h1>
      {/* Your component content */}
    </div>
  );
}
```

## 📋 Available API Endpoints

| Endpoint      | Hook               | Service            | Description                     |
| ------------- | ------------------ | ------------------ | ------------------------------- |
| `/settings/`  | `useSettings()`    | `settingsService`  | Site settings and configuration |
| `/menu/`      | `useMenu()`        | `menuService`      | Navigation menu items           |
| `/sections/`  | `useSections()`    | `sectionsService`  | Page sections content           |
| `/kpis/`      | `useKPIs()`        | `kpisService`      | Key performance indicators      |
| `/companies/` | `useCompanies()`   | `companiesService` | Subsidiary companies            |
| `/board/`     | `useBoard()`       | `boardService`     | Board members                   |
| `/gov/`       | `useGov()`         | `govService`       | Government relations            |
| `/esg/`       | `useESG()`         | `esgService`       | ESG initiatives                 |
| `/news/`      | `useNews()`        | `newsService`      | News and updates                |
| `/posts/`     | `usePosts()`       | `postsService`     | Blog posts                      |
| `/legal/`     | `useLegal()`       | `legalService`     | Legal documents                 |
| `/contact/`   | `useContact()`     | `contactService`   | Contact information             |
| `/search/`    | `useSearch(query)` | `searchService`    | Search functionality            |

## 🔧 Configuration

### API Base URL

The API base URL is configured in `src/lib/api/config.js`:

```javascript
export const API_BASE_URL = "https://neom1dashboard.pythonanywhere.com/api/v1";
```

### Request Timeout

Default timeout is set to 10 seconds, but can be modified in the config file.

### Language Support

All API endpoints support language parameters:

- **English**: `lang=en` (default)
- **Arabic**: `lang=ar`

The language parameter is automatically added to all API requests when using the hooks or services.

## 🎯 Usage Examples

### 1. Using Individual Hooks with Language Support

```jsx
import { useSettingsAsObject, useKPIs } from "@/lib/api";

function Dashboard() {
  const { settings, isLoading: settingsLoading } = useSettingsAsObject("en");
  const { kpis, isLoading: kpisLoading } = useKPIs("en");

  if (settingsLoading || kpisLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>{settings?.brand_name_ar}</h1>
      <div className="kpis">
        {kpis?.results?.map((kpi) => (
          <div key={kpi.id}>
            {kpi.title}: {kpi.value}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 2. Using Combined Dashboard Hook with Language

```jsx
import { useDashboardData } from "@/lib/api";

function Dashboard() {
  const { settings, kpis, companies, board, esg, isLoading, isError } =
    useDashboardData("en"); // or "ar"

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorBoundary error={isError} />;

  return <div>{/* Use all the data */}</div>;
}
```

### 3. Dynamic Language Switching

```jsx
import { useTranslation } from "react-i18next";
import { useSettingsAsObject } from "@/lib/api";

function MyComponent() {
  const { i18n } = useTranslation();
  const { settings, isLoading, isError } = useSettingsAsObject(i18n.language);

  // Settings will automatically update when language changes
  return (
    <div>
      <h1>{settings?.brand_name_ar}</h1>
    </div>
  );
}
```

### 4. Using Services Directly with Language

```jsx
import { settingsService, kpisService } from "@/lib/api";

async function fetchData(lang = "en") {
  try {
    const settings = await settingsService.getAll(lang);
    const kpis = await kpisService.getAll(lang);
    return { settings, kpis };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
```

### 5. Search Functionality with Language

```jsx
import { useSearch } from "@/lib/api";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const { searchResults, isLoading } = useSearch(query, { lang: "en" });

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {isLoading && <LoadingSpinner />}
      {searchResults?.results?.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}
```

## 🔄 SWR Configuration

Each hook is configured with optimal settings:

- **Revalidation**: Different intervals based on data type
- **Deduplication**: Prevents duplicate requests
- **Error handling**: Built-in error states
- **Loading states**: Automatic loading indicators

### Custom SWR Options

You can pass custom SWR options to any hook:

```jsx
const { data, error } = useSettings({
  revalidateOnFocus: false,
  dedupingInterval: 300000, // 5 minutes
});
```

## 🛠️ Error Handling

The API integration includes comprehensive error handling:

1. **Network errors**: Handled by Axios interceptors
2. **API errors**: Caught and re-thrown with meaningful messages
3. **Component errors**: Displayed using ErrorBoundary component

### Error Boundary Usage

```jsx
import ErrorBoundary from "@/components/ErrorBoundary";

function MyComponent() {
  const { data, isError } = useSettings();

  return (
    <ErrorBoundary error={isError}>
      <div>{data?.brand_name_ar}</div>
    </ErrorBoundary>
  );
}
```

## 📊 Loading States

Use the LoadingSpinner component for consistent loading indicators:

```jsx
import LoadingSpinner from "@/components/LoadingSpinner";

function MyComponent() {
  const { data, isLoading } = useSettings();

  if (isLoading) {
    return <LoadingSpinner size="lg" className="py-8" />;
  }

  return <div>{data?.brand_name_ar}</div>;
}
```

## 🔧 Customization

### Adding New Endpoints

1. Add the endpoint to `config.js`:

```javascript
export const API_ENDPOINTS = {
  // ... existing endpoints
  NEW_ENDPOINT: "/new-endpoint/",
};
```

2. Add service functions to `services.js`:

```javascript
export const newService = {
  getAll: () => apiService.get(API_ENDPOINTS.NEW_ENDPOINT),
  getById: (id) => apiService.get(`${API_ENDPOINTS.NEW_ENDPOINT}${id}/`),
};
```

3. Add SWR hook to `hooks.js`:

```javascript
export const useNewData = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "new-data",
    () => newService.getAll(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000,
    }
  );

  return {
    newData: data,
    isLoading,
    isError: error,
    mutate,
  };
};
```

## 🚨 Best Practices

1. **Always handle loading and error states**
2. **Use the appropriate hook for your data needs**
3. **Leverage SWR's caching for better performance**
4. **Use the combined dashboard hook for multiple data sources**
5. **Implement proper error boundaries**
6. **Test your components with different API states**

## 📝 Example Components

Check out these example components:

- `SettingsDisplay.jsx` - Shows how to display settings data
- `ApiExample.jsx` - Comprehensive example using multiple endpoints
- `LoadingSpinner.jsx` - Reusable loading component
- `ErrorBoundary.jsx` - Error handling component

## 🔗 API Documentation

The API endpoints are documented at: https://neom1dashboard.pythonanywhere.com/api/v1

Each endpoint returns data in the following format:

```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [...]
}
```
