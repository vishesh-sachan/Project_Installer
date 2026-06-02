use crate::models::repository::RepositoryInfo;
use crate::models::project::ProjectProfile;

#[derive(Debug, Clone)]
pub struct AnalysisResult {
    pub repository: RepositoryInfo,
    pub projects: Vec<ProjectProfile>,
}