use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum RepositoryType {
    SingleProject,
    MultiProject,
    Monorepo,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RepositoryInfo {
    pub repo_type: RepositoryType,
    pub project_paths: Vec<String>,
}