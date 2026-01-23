/**
 * API service for Campus Sathi Backend
 * Connects frontend to FastAPI backend endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_URL is not defined. Backend URL is required.");
}


export interface QueryRequest {
    query: string;
    document_id?: string;
    top_k?: number;
}

export interface QueryResponse {
    answer: string;
    reasoning: string;
    entities: Record<string, any>;
    sources: Array<{
        page: string | number;
        chunk_type: string;
        document: string;
        relevance_score: number;
    }>;
    processing_time_ms: number;
}

export interface DocumentInfo {
    document_id: string;
    filename: string;
    chunk_count: number;
    indexed_at?: string;
}

export interface UploadResponse {
    document_id: string;
    filename: string;
    status: string;
    chunks_created: number;
    message: string;
}

export interface HealthResponse {
    status: string;
    message: string;
}

export interface StatsResponse {
    total_documents: number;
    total_chunks: number;
    vector_db_size_mb: number;
}

/**
 * Query the RAG system
 */
export async function queryDocuments(request: QueryRequest): Promise<QueryResponse> {
    const response = await fetch(`${API_BASE_URL}/api/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    return handleResponse<QueryResponse>(response);
}

/**
 * Upload a PDF document
 */
export interface UploadResponse {
    document_id: string;
    filename: string;
    status: string;
    chunks_created: number;
    message: string;
}

/**
 * Helper to safely parse JSON response
 */
async function handleResponse<T>(response: Response): Promise<T> {
    const text = await response.text();
    try {
        const data = JSON.parse(text);
        if (!response.ok) {
            throw new Error(data.detail || `API Error: ${response.statusText}`);
        }
        return data;
    } catch (e) {
        // If JSON parse fails, it might be an HTML error page from Cloudflare/proxy
        if (!response.ok) {
            throw new Error(`API Error (${response.status}): ${text.slice(0, 100)}...`);
        }
        throw new Error("Invalid JSON response from server");
    }
}

/**
 * Upload a PDF document
 */
export async function uploadDocument(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/documents/upload`, {
        method: 'POST',
        body: formData,
        // Do NOT set Content-Type header; browser sets it with boundary for FormData
    });

    return handleResponse<UploadResponse>(response);
}

/**
 * Check document processing status
 */
export async function getDocumentStatus(documentId: string): Promise<{ status: string; document_id: string }> {
    const response = await fetch(`${API_BASE_URL}/api/documents/status/${documentId}`);
    return handleResponse<{ status: string; document_id: string }>(response);
}

/**
 * List all indexed documents
 */
export async function listDocuments(): Promise<{ documents: DocumentInfo[]; total: number }> {
    const response = await fetch(`${API_BASE_URL}/api/documents`);
    return handleResponse<{ documents: DocumentInfo[]; total: number }>(response);
}

/**
 * Delete a document
 */
export async function deleteDocument(documentId: string): Promise<{ message: string; document_id: string }> {
    const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}`, {
        method: 'DELETE',
    });
    return handleResponse<{ message: string; document_id: string }>(response);
}

/**
 * Health check
 */
export async function healthCheck(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return handleResponse<HealthResponse>(response);
}

/**
 * Get system stats
 */
export async function getStats(): Promise<StatsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/stats`);
    return handleResponse<StatsResponse>(response);
}
