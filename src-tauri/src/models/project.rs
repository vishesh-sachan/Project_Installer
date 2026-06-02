use crate::models::env::EnvVariable;
use crate::models::technology::Technology;
use crate::models::script::ProjectScript;

#[derive(Debug, Clone)]
pub struct ProjectProfile {
    pub name: String,
    pub path: String,
    pub technologies: Vec<Technology>,
    pub env_variables: Vec<EnvVariable>,
    pub package_manager: Option<String>,
    pub scripts: Vec<ProjectScript>,
}