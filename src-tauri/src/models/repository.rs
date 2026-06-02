#[derive(Debug, Clone)]
pub enum RepositoryType {
    SingleProject,
    MultiProject,
    Monorepo,
}

#[derive(Debug, Clone)]
pub struct RepositoryInfo {
    pub repo_type: RepositoryType,
    pub project_paths: Vec<String>,
}