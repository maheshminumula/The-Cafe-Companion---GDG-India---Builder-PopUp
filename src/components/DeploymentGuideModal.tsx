import React, { useState } from 'react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeDocTab, setActiveDocTab] = useState<'cloud-run' | 'google-sql' | 'cloud-storage' | 'gemini-api' | 'api-docs'>('cloud-run');
  const [copiedSection, setCopiedSection] = useState('');

  if (!isOpen) return null;

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(''), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#220d06]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#ffffff] max-w-4xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#3a2118]/10 flex flex-col gap-5 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#504440] hover:text-[#1c1c18] hover:bg-[#e5e2dc] transition-colors"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#9c4328]">cloud_upload</span>
            <span className="font-label-sm uppercase tracking-wider text-[#9c4328] font-bold">
              Production Architecture &amp; DevOps Guide
            </span>
          </div>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#220d06]">
            Deployment Guide &amp; API Integration Documentation
          </h2>
          <p className="font-body-sm text-sm text-[#504440] mt-1">
            Complete architectural blueprints and scripts for hosting on <strong>Google Cloud Run</strong>, <strong>Google Cloud SQL (PostgreSQL)</strong>, <strong>Google Cloud Storage</strong>, and <strong>Google Gemini Multimodal APIs</strong>.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 bg-[#f0eee8] p-1 rounded-xl">
          <button
            onClick={() => setActiveDocTab('cloud-run')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeDocTab === 'cloud-run' ? 'bg-[#220d06] text-white shadow-sm' : 'text-[#504440] hover:text-[#1c1c18]'
            }`}
          >
            Google Cloud Run
          </button>
          <button
            onClick={() => setActiveDocTab('google-sql')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeDocTab === 'google-sql' ? 'bg-[#220d06] text-white shadow-sm' : 'text-[#504440] hover:text-[#1c1c18]'
            }`}
          >
            Google SQL (PostgreSQL)
          </button>
          <button
            onClick={() => setActiveDocTab('cloud-storage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeDocTab === 'cloud-storage' ? 'bg-[#220d06] text-white shadow-sm' : 'text-[#504440] hover:text-[#1c1c18]'
            }`}
          >
            Cloud Storage
          </button>
          <button
            onClick={() => setActiveDocTab('gemini-api')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeDocTab === 'gemini-api' ? 'bg-[#220d06] text-white shadow-sm' : 'text-[#504440] hover:text-[#1c1c18]'
            }`}
          >
            Gemini Multimodal APIs
          </button>
          <button
            onClick={() => setActiveDocTab('api-docs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeDocTab === 'api-docs' ? 'bg-[#9c4328] text-white shadow-sm' : 'text-[#9c4328] hover:bg-[#ffdbd1]'
            }`}
          >
            REST API Reference
          </button>
        </div>

        {/* Tab 1: Google Cloud Run */}
        {activeDocTab === 'cloud-run' && (
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#3a2118]/8">
              <h3 className="font-bold text-sm text-[#220d06] mb-1">Step 1: Containerize &amp; Deploy to Google Cloud Run</h3>
              <p className="text-[#504440] mb-3">
                Cloud Run provides autoscaling (scale-to-zero when quiet, instant bursts during morning rush hours), HTTP/2 multiplexing, and zero-downtime blue/green rollouts.
              </p>

              <div className="relative bg-[#1c1c18] text-[#fcf9f3] p-4 rounded-lg font-mono text-[11px] overflow-x-auto">
                <button
                  onClick={() =>
                    handleCopy(
                      `# 1. Authenticate with Google Cloud
gcloud auth login
gcloud config set project YOUR_GCP_PROJECT_ID

# 2. Build and submit production container image via Cloud Build
gcloud builds submit --tag gcr.io/YOUR_GCP_PROJECT_ID/cafe-companion:latest

# 3. Deploy container service to Google Cloud Run
gcloud run deploy cafe-companion \\
  --image gcr.io/YOUR_GCP_PROJECT_ID/cafe-companion:latest \\
  --platform managed \\
  --region asia-southeast1 \\
  --allow-unauthenticated \\
  --port 3000 \\
  --min-instances 0 \\
  --max-instances 20 \\
  --set-env-vars GEMINI_API_KEY="AIzaSy...",NODE_ENV="production"`,
                      'cloud-run'
                    )
                  }
                  className="absolute top-2 right-2 px-2 py-1 bg-[#504440] hover:bg-[#827470] rounded text-[10px] text-white"
                >
                  {copiedSection === 'cloud-run' ? 'Copied!' : 'Copy Script'}
                </button>
                <pre>{`# 1. Authenticate with Google Cloud
gcloud auth login
gcloud config set project YOUR_GCP_PROJECT_ID

# 2. Build and submit production container image via Cloud Build
gcloud builds submit --tag gcr.io/YOUR_GCP_PROJECT_ID/cafe-companion:latest

# 3. Deploy container service to Google Cloud Run
gcloud run deploy cafe-companion \\
  --image gcr.io/YOUR_GCP_PROJECT_ID/cafe-companion:latest \\
  --platform managed \\
  --region asia-southeast1 \\
  --allow-unauthenticated \\
  --port 3000 \\
  --min-instances 0 \\
  --max-instances 20 \\
  --set-env-vars GEMINI_API_KEY="AIzaSy...",NODE_ENV="production"`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Google Cloud SQL */}
        {activeDocTab === 'google-sql' && (
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#3a2118]/8">
              <h3 className="font-bold text-sm text-[#220d06] mb-1">Step 2: Google Cloud SQL (PostgreSQL 16) Provisioning</h3>
              <p className="text-[#504440] mb-3">
                Stores relational patron profiles, table booking slots, customer custom recipes, and encrypted store revenue transactions.
              </p>

              <div className="relative bg-[#1c1c18] text-[#fcf9f3] p-4 rounded-lg font-mono text-[11px] overflow-x-auto">
                <button
                  onClick={() =>
                    handleCopy(
                      `# 1. Create Cloud SQL PostgreSQL instance
gcloud sql instances create cafe-sql-db \\
  --database-version=POSTGRES_16 \\
  --tier=db-custom-2-7680 \\
  --region=asia-southeast1 \\
  --storage-type=SSD \\
  --storage-size=20GB

# 2. Create PostgreSQL database and service user
gcloud sql databases create cafe_companion_prod --instance=cafe-sql-db
gcloud sql users create cafe_app_user --instance=cafe-sql-db --password="SecurePassword2026!"

# 3. Connect Cloud Run to Cloud SQL via Cloud SQL Auth Proxy connector
gcloud run services update cafe-companion \\
  --add-cloudsql-instances YOUR_GCP_PROJECT_ID:asia-southeast1:cafe-sql-db \\
  --set-env-vars DATABASE_URL="postgresql://cafe_app_user:SecurePassword2026!@/cafe_companion_prod?host=/cloudsql/YOUR_GCP_PROJECT_ID:asia-southeast1:cafe-sql-db"`,
                      'google-sql'
                    )
                  }
                  className="absolute top-2 right-2 px-2 py-1 bg-[#504440] hover:bg-[#827470] rounded text-[10px] text-white"
                >
                  {copiedSection === 'google-sql' ? 'Copied!' : 'Copy Script'}
                </button>
                <pre>{`# 1. Create Cloud SQL PostgreSQL instance
gcloud sql instances create cafe-sql-db \\
  --database-version=POSTGRES_16 \\
  --tier=db-custom-2-7680 \\
  --region=asia-southeast1 \\
  --storage-type=SSD \\
  --storage-size=20GB

# 2. Create PostgreSQL database and service user
gcloud sql databases create cafe_companion_prod --instance=cafe-sql-db
gcloud sql users create cafe_app_user --instance=cafe-sql-db --password="SecurePassword2026!"

# 3. Connect Cloud Run to Cloud SQL via Cloud SQL Auth Proxy connector
gcloud run services update cafe-companion \\
  --add-cloudsql-instances YOUR_GCP_PROJECT_ID:asia-southeast1:cafe-sql-db \\
  --set-env-vars DATABASE_URL="postgresql://cafe_app_user:SecurePassword2026!@/cafe_companion_prod?host=/cloudsql/YOUR_GCP_PROJECT_ID:asia-southeast1:cafe-sql-db"`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Google Cloud Storage */}
        {activeDocTab === 'cloud-storage' && (
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#3a2118]/8">
              <h3 className="font-bold text-sm text-[#220d06] mb-1">Step 3: Google Cloud Storage (Bucket Setup)</h3>
              <p className="text-[#504440] mb-3">
                Stores high-resolution pastry photos, artisanal espresso bar photography, and user-uploaded breakfast imagery for Gemini Vision taste matching.
              </p>

              <div className="relative bg-[#1c1c18] text-[#fcf9f3] p-4 rounded-lg font-mono text-[11px] overflow-x-auto">
                <button
                  onClick={() =>
                    handleCopy(
                      `# 1. Create Cloud Storage multi-regional asset bucket
gcloud storage buckets create gs://cafe-companion-assets-bucket \\
  --location=asia-southeast1 \\
  --uniform-bucket-level-access

# 2. Make bucket read-accessible for public web delivery
gcloud storage buckets add-iam-policy-binding gs://cafe-companion-assets-bucket \\
  --member=allUsers \\
  --role=roles/storage.objectViewer

# 3. Set CORS policy for web canvas image manipulation
cat <<EOF > cors.json
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF
gcloud storage buckets update gs://cafe-companion-assets-bucket --cors-file=cors.json`,
                      'cloud-storage'
                    )
                  }
                  className="absolute top-2 right-2 px-2 py-1 bg-[#504440] hover:bg-[#827470] rounded text-[10px] text-white"
                >
                  {copiedSection === 'cloud-storage' ? 'Copied!' : 'Copy Script'}
                </button>
                <pre>{`# 1. Create Cloud Storage multi-regional asset bucket
gcloud storage buckets create gs://cafe-companion-assets-bucket \\
  --location=asia-southeast1 \\
  --uniform-bucket-level-access

# 2. Make bucket read-accessible for public web delivery
gcloud storage buckets add-iam-policy-binding gs://cafe-companion-assets-bucket \\
  --member=allUsers \\
  --role=roles/storage.objectViewer

# 3. Set CORS policy for web canvas image manipulation
cat <<EOF > cors.json
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF
gcloud storage buckets update gs://cafe-companion-assets-bucket --cors-file=cors.json`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Gemini Multimodal APIs */}
        {activeDocTab === 'gemini-api' && (
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#3a2118]/8">
              <h3 className="font-bold text-sm text-[#220d06] mb-1">Step 4: Gemini Multimodal APIs Integration Pattern</h3>
              <p className="text-[#504440] mb-3">
                Uses the modern <code>@google/genai</code> SDK on the server-side with strict JSON schema definitions for sensory taste matching and user recipe evaluation.
              </p>

              <div className="relative bg-[#1c1c18] text-[#fcf9f3] p-4 rounded-lg font-mono text-[11px] overflow-x-auto">
                <button
                  onClick={() =>
                    handleCopy(
                      `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: { 'User-Agent': 'aistudio-build' }
  }
});

// Evaluate Customer Recipe with Sensory Parameters
const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: 'Analyze this brew: V60, 16g coffee, 250g water at 93C...',
  config: {
    responseMimeType: 'application/json'
  }
});

console.log(response.text);`,
                      'gemini-api'
                    )
                  }
                  className="absolute top-2 right-2 px-2 py-1 bg-[#504440] hover:bg-[#827470] rounded text-[10px] text-white"
                >
                  {copiedSection === 'gemini-api' ? 'Copied!' : 'Copy Code'}
                </button>
                <pre>{`import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: { 'User-Agent': 'aistudio-build' }
  }
});

// Evaluate Customer Recipe with Sensory Parameters
const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: 'Analyze this brew: V60, 16g coffee, 250g water at 93C...',
  config: {
    responseMimeType: 'application/json'
  }
});

console.log(response.text);`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: REST API Reference */}
        {activeDocTab === 'api-docs' && (
          <div className="flex flex-col gap-3 text-xs">
            <h3 className="font-bold text-sm text-[#220d06]">Available REST API Endpoints</h3>
            <div className="divide-y divide-[#3a2118]/10 border border-[#3a2118]/10 rounded-xl overflow-hidden">
              <div className="p-3 bg-[#f6f3ed] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#220d06] text-white font-mono font-bold text-[10px]">GET</span>
                  <span className="font-mono font-bold text-[#220d06]">/api/health</span>
                </div>
                <span className="text-[#504440]">System verification, Cloud Run runtime, DB connection</span>
              </div>
              <div className="p-3 bg-[#ffffff] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#220d06] text-white font-mono font-bold text-[10px]">GET</span>
                  <span className="font-mono font-bold text-[#220d06]">/api/recipes</span>
                </div>
                <span className="text-[#504440]">Retrieve community &amp; patron custom brew recipes</span>
              </div>
              <div className="p-3 bg-[#f6f3ed] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#9c4328] text-white font-mono font-bold text-[10px]">POST</span>
                  <span className="font-mono font-bold text-[#220d06]">/api/recipes/analyze-and-create</span>
                </div>
                <span className="text-[#504440]">Submit custom recipe; Gemini computes acidity/sweetness/body ratings</span>
              </div>
              <div className="p-3 bg-[#ffffff] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#9c4328] text-white font-mono font-bold text-[10px]">POST</span>
                  <span className="font-mono font-bold text-[#220d06]">/api/sensory/synthesize</span>
                </div>
                <span className="text-[#504440]">Real-time biological state query to coffee &amp; pastry synergy match</span>
              </div>
              <div className="p-3 bg-[#fff2ee] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#9c4328] text-white font-mono font-bold text-[10px]">GET</span>
                  <span className="font-mono font-bold text-[#76270e]">/api/admin/revenue</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#76270e] text-white text-[9px] font-bold">Admin Only</span>
                </div>
                <span className="text-[#504440]">Internal cafe team register ledger, COGS, ticket volume</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#220d06] text-white text-xs font-bold hover:bg-[#3a2118]"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
