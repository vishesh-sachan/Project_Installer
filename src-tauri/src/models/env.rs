#[derive(Debug, Clone)]
pub struct EnvVariable {
    pub name: String,
    pub default_value: Option<String>,
    pub required: bool,
}