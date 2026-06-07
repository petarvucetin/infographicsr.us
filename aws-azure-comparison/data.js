window.DATA = [
 {cat:"Compute", icon:"🖥️", aws:"Amazon EC2", az:"Azure Virtual Machines",
  desc:"Resizable virtual servers (IaaS) for running any OS and workload on demand.",
  ex:"Host a web app or legacy app on a custom-sized VM.",
  awsUrl:"https://docs.aws.amazon.com/ec2/", azUrl:"https://learn.microsoft.com/en-us/azure/virtual-machines/",
  awsCli:`aws ec2 run-instances \\
  --image-id ami-0abcd1234 \\
  --instance-type t3.micro --key-name my-key`,
  awsPy:`import boto3
boto3.client("ec2").run_instances(
    ImageId="ami-0abcd1234", InstanceType="t3.micro",
    MinCount=1, MaxCount=1, KeyName="my-key")`,
  awsCs:`using Amazon.EC2; using Amazon.EC2.Model;
var ec2 = new AmazonEC2Client();
await ec2.RunInstancesAsync(new RunInstancesRequest {
    ImageId = "ami-0abcd1234", InstanceType = "t3.micro",
    MinCount = 1, MaxCount = 1, KeyName = "my-key" });`,
  azCli:`az vm create -g myRG -n myVM \\
  --image Ubuntu2204 --size Standard_B1s \\
  --admin-username azureuser --generate-ssh-keys`,
  azPy:`from azure.identity import DefaultAzureCredential
from azure.mgmt.compute import ComputeManagementClient
c = ComputeManagementClient(DefaultAzureCredential(), SUB_ID)
c.virtual_machines.begin_create_or_update("myRG", "myVM", params)`,
  azCs:`using Azure.Identity; using Azure.ResourceManager;
var arm = new ArmClient(new DefaultAzureCredential());
var rg = arm.GetResourceGroupResource(rgId);
await rg.GetVirtualMachines()
    .CreateOrUpdateAsync(WaitUntil.Completed, "myVM", vmData);`},

 {cat:"Compute", icon:"🖥️", aws:"EC2 Auto Scaling", az:"Virtual Machine Scale Sets",
  desc:"Automatically add/remove identical VMs to match load.",
  ex:"Scale a stateless API fleet up at peak traffic.",
  awsUrl:"https://docs.aws.amazon.com/autoscaling/", azUrl:"https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/",
  awsCli:`aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name my-asg \\
  --launch-template LaunchTemplateName=my-lt \\
  --min-size 1 --max-size 5 --desired-capacity 2`,
  awsPy:`import boto3
boto3.client("autoscaling").create_auto_scaling_group(
    AutoScalingGroupName="my-asg", MinSize=1, MaxSize=5,
    DesiredCapacity=2,
    LaunchTemplate={"LaunchTemplateName": "my-lt"})`,
  awsCs:`var asg = new AmazonAutoScalingClient();
await asg.CreateAutoScalingGroupAsync(new() {
    AutoScalingGroupName = "my-asg", MinSize = 1, MaxSize = 5,
    DesiredCapacity = 2,
    LaunchTemplate = new() { LaunchTemplateName = "my-lt" } });`,
  azCli:`az vmss create -g myRG -n myScaleSet \\
  --image Ubuntu2204 --instance-count 2 \\
  --vm-sku Standard_B1s --generate-ssh-keys`,
  azPy:`c.virtual_machine_scale_sets.begin_create_or_update(
    "myRG", "myScaleSet", vmss_params)`,
  azCs:`await rg.GetVirtualMachineScaleSets()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "myScaleSet", vmssData);`},

 {cat:"Compute", icon:"🖥️", aws:"AWS Batch", az:"Azure Batch",
  desc:"Managed scheduling and scaling of large batch/HPC compute jobs.",
  ex:"Render thousands of video frames in parallel.",
  awsUrl:"https://docs.aws.amazon.com/batch/", azUrl:"https://learn.microsoft.com/en-us/azure/batch/",
  awsCli:`aws batch submit-job --job-name my-job \\
  --job-queue my-queue --job-definition my-def`,
  awsPy:`import boto3
boto3.client("batch").submit_job(
    jobName="my-job", jobQueue="my-queue",
    jobDefinition="my-def")`,
  awsCs:`var batch = new AmazonBatchClient();
await batch.SubmitJobAsync(new() {
    JobName = "my-job", JobQueue = "my-queue",
    JobDefinition = "my-def" });`,
  azCli:`az batch pool create --id mypool \\
  --vm-size Standard_A1_v2 --target-dedicated-nodes 2 \\
  --image canonical:ubuntuserver:22_04-lts \\
  --node-agent-sku-id "batch.node.ubuntu 22.04"`,
  azPy:`from azure.batch import BatchServiceClient
client.pool.add(PoolAddParameter(
    id="mypool", vm_size="STANDARD_A1_v2",
    target_dedicated_nodes=2, virtual_machine_configuration=cfg))`,
  azCs:`var pool = batchClient.PoolOperations.CreatePool(
    "mypool", "STANDARD_A1_v2", imageRef,
    targetDedicatedComputeNodes: 2);
await pool.CommitAsync();`},

 {cat:"Compute", icon:"🖥️", aws:"AWS Elastic Beanstalk", az:"Azure App Service",
  desc:"Platform-as-a-service to deploy and run web apps/APIs without managing servers.",
  ex:"Push a Node.js or .NET app and let the platform handle scaling.",
  awsUrl:"https://docs.aws.amazon.com/elasticbeanstalk/", azUrl:"https://learn.microsoft.com/en-us/azure/app-service/",
  awsCli:`eb init -p node.js my-app
eb create my-env`,
  awsPy:`import boto3
boto3.client("elasticbeanstalk").create_environment(
    ApplicationName="my-app", EnvironmentName="my-env",
    SolutionStackName="64bit Amazon Linux 2 running Node.js 18")`,
  awsCs:`var eb = new AmazonElasticBeanstalkClient();
await eb.CreateEnvironmentAsync(new() {
    ApplicationName = "my-app",
    EnvironmentName = "my-env" });`,
  azCli:`az webapp up --name myWebApp \\
  -g myRG --runtime "NODE:18-lts"`,
  azPy:`from azure.mgmt.web import WebSiteManagementClient
w = WebSiteManagementClient(DefaultAzureCredential(), SUB_ID)
w.web_apps.begin_create_or_update("myRG", "myWebApp", site)`,
  azCs:`var arm = new ArmClient(new DefaultAzureCredential());
await rg.GetWebSites()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "myWebApp", siteData);`},

 {cat:"Compute", icon:"🖥️", aws:"VMware Cloud on AWS", az:"Azure VMware Solution",
  desc:"Run native VMware vSphere environments in the cloud.",
  ex:"Lift-and-shift an on-prem VMware estate without re-platforming.",
  awsUrl:"https://aws.amazon.com/vmware/", azUrl:"https://learn.microsoft.com/en-us/azure/azure-vmware/",
  awsCli:`# Deploy an SDDC via the VMware Cloud Console,
# then manage with native vCenter / vSphere tools.`,
  awsPy:`# No first-party AWS SDK client. SDDCs are managed
# through the VMware Cloud console and vSphere
# automation SDKs (pyVmomi).`,
  awsCs:`// Managed via the VMware Cloud Console / vSphere
// automation APIs; no native AWS SDK client.`,
  azCli:`az vmware private-cloud create -g myRG \\
  -n myCloud --location eastus --sku AV36 \\
  --cluster-size 3 --network-block 10.0.0.0/22`,
  azPy:`from azure.mgmt.avs import AVSClient
a = AVSClient(DefaultAzureCredential(), SUB_ID)
a.private_clouds.begin_create_or_update(
    "myRG", "myCloud", cloud)`,
  azCs:`await rg.GetAvsPrivateClouds()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "myCloud", cloudData);`},

 {cat:"Serverless", icon:"⚡", aws:"AWS Lambda", az:"Azure Functions",
  desc:"Run event-driven code without provisioning servers; pay per execution.",
  ex:"Resize an image automatically when a file is uploaded.",
  awsUrl:"https://docs.aws.amazon.com/lambda/", azUrl:"https://learn.microsoft.com/en-us/azure/azure-functions/",
  awsCli:`zip function.zip index.js
aws lambda create-function --function-name hello \\
  --runtime nodejs18.x --handler index.handler \\
  --zip-file fileb://function.zip --role <role-arn>`,
  awsPy:`def handler(event, context):
    return {"statusCode": 200, "body": "Hello from Lambda"}`,
  awsCs:`public class Function
{
    public string Handler(object input, ILambdaContext ctx)
        => "Hello from Lambda";
}`,
  azCli:`func init myapp --worker-runtime node
func new --name hello --template "HTTP trigger"
func azure functionapp publish myFuncApp`,
  azPy:`import azure.functions as func
def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse("Hello from Azure Functions")`,
  azCs:`[Function("Hello")]
public HttpResponseData Run(
    [HttpTrigger(AuthorizationLevel.Function, "get")]
    HttpRequestData req)
    => req.CreateResponse(HttpStatusCode.OK);`},

 {cat:"Serverless", icon:"⚡", aws:"AWS Step Functions", az:"Azure Logic Apps / Durable Functions",
  desc:"Orchestrate multi-step workflows and stateful processes.",
  ex:"Chain approval steps across several functions and services.",
  awsUrl:"https://docs.aws.amazon.com/step-functions/", azUrl:"https://learn.microsoft.com/en-us/azure/logic-apps/",
  awsCli:`aws stepfunctions start-execution \\
  --state-machine-arn <arn> \\
  --input '{"order": 123}'`,
  awsPy:`import boto3
boto3.client("stepfunctions").start_execution(
    stateMachineArn=ARN, input='{"order": 123}')`,
  awsCs:`var sfn = new AmazonStepFunctionsClient();
await sfn.StartExecutionAsync(new() {
    StateMachineArn = arn,
    Input = "{\\"order\\": 123}" });`,
  azCli:`az logic workflow create -g myRG \\
  --name myWorkflow --definition @workflow.json`,
  azPy:`from azure.mgmt.logic import LogicManagementClient
l = LogicManagementClient(DefaultAzureCredential(), SUB_ID)
l.workflows.create_or_update("myRG", "myWorkflow", workflow)`,
  azCs:`var logic = new LogicManagementClient(cred)
    { SubscriptionId = subId };
await logic.Workflows.CreateOrUpdateAsync(
    "myRG", "myWorkflow", workflow);`},

 {cat:"Serverless", icon:"⚡", aws:"AWS Fargate", az:"Azure Container Instances",
  desc:"Run containers serverlessly without managing the underlying VMs.",
  ex:"Spin up a short-lived container for a one-off task.",
  awsUrl:"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html", azUrl:"https://learn.microsoft.com/en-us/azure/container-instances/",
  awsCli:`aws ecs run-task --cluster my-cluster \\
  --launch-type FARGATE --task-definition my-task`,
  awsPy:`import boto3
boto3.client("ecs").run_task(
    cluster="my-cluster", launchType="FARGATE",
    taskDefinition="my-task")`,
  awsCs:`var ecs = new AmazonECSClient();
await ecs.RunTaskAsync(new() {
    Cluster = "my-cluster",
    LaunchType = LaunchType.FARGATE,
    TaskDefinition = "my-task" });`,
  azCli:`az container create -g myRG --name mycontainer \\
  --image nginx --cpu 1 --memory 1.5 --ports 80`,
  azPy:`from azure.mgmt.containerinstance import (
    ContainerInstanceManagementClient)
ci = ContainerInstanceManagementClient(
    DefaultAzureCredential(), SUB_ID)
ci.container_groups.begin_create_or_update(
    "myRG", "mycontainer", group)`,
  azCs:`await rg.GetContainerGroups()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "mycontainer", groupData);`},

 {cat:"Containers", icon:"📦", aws:"Amazon ECS", az:"Azure Container Apps",
  desc:"Managed orchestration for running and scaling containerized microservices.",
  ex:"Run a set of microservices with built-in autoscaling.",
  awsUrl:"https://docs.aws.amazon.com/ecs/", azUrl:"https://learn.microsoft.com/en-us/azure/container-apps/",
  awsCli:`aws ecs create-service --cluster my-cluster \\
  --service-name web --task-definition web:1 \\
  --desired-count 3`,
  awsPy:`import boto3
boto3.client("ecs").create_service(
    cluster="my-cluster", serviceName="web",
    taskDefinition="web:1", desiredCount=3)`,
  awsCs:`var ecs = new AmazonECSClient();
await ecs.CreateServiceAsync(new() {
    Cluster = "my-cluster", ServiceName = "web",
    TaskDefinition = "web:1", DesiredCount = 3 });`,
  azCli:`az containerapp create -g myRG -n web \\
  --environment myEnv --image nginx \\
  --target-port 80 --ingress external`,
  azPy:`from azure.mgmt.appcontainers import (
    ContainerAppsAPIClient)
c = ContainerAppsAPIClient(DefaultAzureCredential(), SUB_ID)
c.container_apps.begin_create_or_update("myRG", "web", app)`,
  azCs:`await rg.GetContainerApps()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "web", appData);`},

 {cat:"Containers", icon:"📦", aws:"Amazon EKS", az:"Azure Kubernetes Service (AKS)",
  desc:"Managed Kubernetes control plane for container orchestration.",
  ex:"Deploy a Helm-based microservice platform on Kubernetes.",
  awsUrl:"https://docs.aws.amazon.com/eks/", azUrl:"https://learn.microsoft.com/en-us/azure/aks/",
  awsCli:`eksctl create cluster --name my-cluster \\
  --nodes 3 --node-type t3.medium`,
  awsPy:`import boto3
boto3.client("eks").create_cluster(
    name="my-cluster", roleArn=ROLE,
    resourcesVpcConfig={"subnetIds": subnets})`,
  awsCs:`var eks = new AmazonEKSClient();
await eks.CreateClusterAsync(new() {
    Name = "my-cluster", RoleArn = role,
    ResourcesVpcConfig = vpcConfig });`,
  azCli:`az aks create -g myRG -n myAKS \\
  --node-count 3 --generate-ssh-keys`,
  azPy:`from azure.mgmt.containerservice import (
    ContainerServiceClient)
k = ContainerServiceClient(DefaultAzureCredential(), SUB_ID)
k.managed_clusters.begin_create_or_update(
    "myRG", "myAKS", cluster)`,
  azCs:`await rg.GetContainerServiceManagedClusters()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "myAKS", clusterData);`},

 {cat:"Containers", icon:"📦", aws:"Amazon ECR", az:"Azure Container Registry",
  desc:"Private registry to store, scan, and manage container images.",
  ex:"Store CI-built Docker images for deployment to AKS.",
  awsUrl:"https://docs.aws.amazon.com/ecr/", azUrl:"https://learn.microsoft.com/en-us/azure/container-registry/",
  awsCli:`aws ecr create-repository --repository-name my-app
docker push <acct>.dkr.ecr.<region>.amazonaws.com/my-app`,
  awsPy:`import boto3
boto3.client("ecr").create_repository(
    repositoryName="my-app")`,
  awsCs:`var ecr = new AmazonECRClient();
await ecr.CreateRepositoryAsync(new() {
    RepositoryName = "my-app" });`,
  azCli:`az acr create -g myRG -n myRegistry --sku Basic
az acr build -r myRegistry -t my-app:v1 .`,
  azPy:`from azure.mgmt.containerregistry import (
    ContainerRegistryManagementClient)
r = ContainerRegistryManagementClient(
    DefaultAzureCredential(), SUB_ID)
r.registries.begin_create("myRG", "myRegistry", registry)`,
  azCs:`await rg.GetContainerRegistries()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "myRegistry", registryData);`},

 {cat:"Storage", icon:"💾", aws:"Amazon S3", az:"Azure Blob Storage",
  desc:"Massively scalable object storage for files, backups, and static assets.",
  ex:"Store user uploads and serve a static website.",
  awsUrl:"https://docs.aws.amazon.com/s3/", azUrl:"https://learn.microsoft.com/en-us/azure/storage/blobs/",
  awsCli:`aws s3 cp ./photo.jpg s3://my-bucket/photo.jpg`,
  awsPy:`import boto3
boto3.client("s3").upload_file(
    "photo.jpg", "my-bucket", "photo.jpg")`,
  awsCs:`var s3 = new AmazonS3Client();
await s3.PutObjectAsync(new() {
    BucketName = "my-bucket", Key = "photo.jpg",
    FilePath = "photo.jpg" });`,
  azCli:`az storage blob upload --account-name myacct \\
  -c mycontainer -f ./photo.jpg -n photo.jpg`,
  azPy:`from azure.storage.blob import BlobClient
BlobClient.from_connection_string(
    CONN, "mycontainer", "photo.jpg") \\
    .upload_blob(open("photo.jpg", "rb"))`,
  azCs:`var blob = new BlobClient(conn, "mycontainer", "photo.jpg");
await blob.UploadAsync("photo.jpg");`},

 {cat:"Storage", icon:"💾", aws:"Amazon EBS", az:"Azure Managed Disks",
  desc:"Block storage volumes attached to virtual machines.",
  ex:"Attach a persistent SSD volume to a database VM.",
  awsUrl:"https://docs.aws.amazon.com/ebs/", azUrl:"https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview",
  awsCli:`aws ec2 create-volume --size 100 \\
  --volume-type gp3 --availability-zone us-east-1a`,
  awsPy:`import boto3
boto3.client("ec2").create_volume(
    Size=100, VolumeType="gp3",
    AvailabilityZone="us-east-1a")`,
  awsCs:`var ec2 = new AmazonEC2Client();
await ec2.CreateVolumeAsync(new() {
    Size = 100, VolumeType = VolumeType.Gp3,
    AvailabilityZone = "us-east-1a" });`,
  azCli:`az disk create -g myRG -n myDisk \\
  --size-gb 100 --sku Premium_LRS`,
  azPy:`c.disks.begin_create_or_update("myRG", "myDisk", {
    "location": "eastus", "disk_size_gb": 100,
    "sku": {"name": "Premium_LRS"},
    "creation_data": {"create_option": "Empty"}})`,
  azCs:`await rg.GetManagedDisks()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "myDisk", diskData);`},

 {cat:"Storage", icon:"💾", aws:"Amazon EFS", az:"Azure Files",
  desc:"Fully managed shared file storage accessible over standard protocols.",
  ex:"Mount a shared SMB/NFS file share across many VMs.",
  awsUrl:"https://docs.aws.amazon.com/efs/", azUrl:"https://learn.microsoft.com/en-us/azure/storage/files/",
  awsCli:`aws efs create-file-system \\
  --performance-mode generalPurpose`,
  awsPy:`import boto3
boto3.client("efs").create_file_system(
    PerformanceMode="generalPurpose")`,
  awsCs:`var efs = new AmazonElasticFileSystemClient();
await efs.CreateFileSystemAsync(new() {
    PerformanceMode = PerformanceMode.GeneralPurpose });`,
  azCli:`az storage share create --account-name myacct \\
  --name myshare --quota 100`,
  azPy:`from azure.storage.fileshare import ShareClient
ShareClient.from_connection_string(
    CONN, "myshare").create_share()`,
  azCs:`var share = new ShareClient(conn, "myshare");
await share.CreateAsync();`},

 {cat:"Storage", icon:"💾", aws:"Amazon S3 Glacier", az:"Azure Blob Archive Tier",
  desc:"Low-cost archival storage for rarely accessed, long-retention data.",
  ex:"Archive compliance records you must keep for 7 years.",
  awsUrl:"https://docs.aws.amazon.com/amazonglacier/", azUrl:"https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview",
  awsCli:`aws s3 cp big.zip s3://my-bucket/big.zip \\
  --storage-class GLACIER`,
  awsPy:`import boto3
boto3.client("s3").upload_file(
    "big.zip", "my-bucket", "big.zip",
    ExtraArgs={"StorageClass": "GLACIER"})`,
  awsCs:`await s3.PutObjectAsync(new() {
    BucketName = "my-bucket", Key = "big.zip",
    FilePath = "big.zip",
    StorageClass = S3StorageClass.Glacier });`,
  azCli:`az storage blob upload --account-name myacct \\
  -c archive -f big.zip -n big.zip --tier Archive`,
  azPy:`from azure.storage.blob import (
    BlobClient, StandardBlobTier)
b = BlobClient.from_connection_string(
    CONN, "archive", "big.zip")
b.upload_blob(open("big.zip", "rb"),
    standard_blob_tier=StandardBlobTier.ARCHIVE)`,
  azCs:`await blob.UploadAsync("big.zip");
await blob.SetAccessTierAsync(AccessTier.Archive);`},

 {cat:"Storage", icon:"💾", aws:"AWS Snowball", az:"Azure Data Box",
  desc:"Physical appliances to transfer large data volumes into the cloud.",
  ex:"Ship 100 TB of media to the cloud over a network bottleneck.",
  awsUrl:"https://docs.aws.amazon.com/snowball/", azUrl:"https://learn.microsoft.com/en-us/azure/databox/",
  awsCli:`aws snowball create-job --job-type IMPORT \\
  --resources file://resources.json \\
  --address-id ADID --snowball-type EDGE`,
  awsPy:`import boto3
boto3.client("snowball").create_job(
    JobType="IMPORT", SnowballType="EDGE",
    AddressId="ADID")`,
  awsCs:`var sb = new AmazonSnowballClient();
await sb.CreateJobAsync(new() {
    JobType = JobType.IMPORT,
    SnowballType = SnowballType.EDGE,
    AddressId = "ADID" });`,
  azCli:`# Order an appliance via the Azure portal, or:
az databox job create -g myRG -n myJob --sku DataBox`,
  azPy:`from azure.mgmt.databox import (
    DataBoxManagementClient)
d = DataBoxManagementClient(
    DefaultAzureCredential(), SUB_ID)
d.jobs.begin_create("myRG", "myJob", job_resource)`,
  azCs:`var dbx = new DataBoxManagementClient(cred)
    { SubscriptionId = subId };
await dbx.Jobs.StartCreateAsync(
    "myRG", "myJob", jobResource);`},

 {cat:"Storage", icon:"💾", aws:"AWS Backup", az:"Azure Backup",
  desc:"Centralized, policy-based backup across services.",
  ex:"Schedule daily backups of VMs and databases with retention rules.",
  awsUrl:"https://docs.aws.amazon.com/aws-backup/", azUrl:"https://learn.microsoft.com/en-us/azure/backup/",
  awsCli:`aws backup start-backup-job \\
  --backup-vault-name Default \\
  --resource-arn <arn> --iam-role-arn <role>`,
  awsPy:`import boto3
boto3.client("backup").start_backup_job(
    BackupVaultName="Default",
    ResourceArn=ARN, IamRoleArn=ROLE)`,
  awsCs:`var bk = new AmazonBackupClient();
await bk.StartBackupJobAsync(new() {
    BackupVaultName = "Default",
    ResourceArn = arn, IamRoleArn = role });`,
  azCli:`az backup protection enable-for-vm -g myRG \\
  --vault-name myVault --vm myVM \\
  --policy-name DefaultPolicy`,
  azPy:`from azure.mgmt.recoveryservicesbackup import (
    RecoveryServicesBackupClient)
client.protected_items.create_or_update(
    "myVault", "myRG", fabric, container, item, params)`,
  azCs:`await client.ProtectedItems.CreateOrUpdateAsync(
    "myVault", "myRG", fabric, container, item, param);`},

 {cat:"Databases", icon:"🗄️", aws:"Amazon RDS", az:"Azure SQL Database / Azure Database for MySQL·PostgreSQL",
  desc:"Managed relational databases with automated patching, backups, and HA.",
  ex:"Run a managed PostgreSQL backend for a web app.",
  awsUrl:"https://docs.aws.amazon.com/rds/", azUrl:"https://learn.microsoft.com/en-us/azure/azure-sql/database/",
  awsCli:`aws rds create-db-instance \\
  --db-instance-identifier mydb --engine postgres \\
  --db-instance-class db.t3.micro \\
  --allocated-storage 20 \\
  --master-username admin --master-user-password ****`,
  awsPy:`import boto3
boto3.client("rds").create_db_instance(
    DBInstanceIdentifier="mydb", Engine="postgres",
    DBInstanceClass="db.t3.micro", AllocatedStorage=20,
    MasterUsername="admin", MasterUserPassword="****")`,
  awsCs:`var rds = new AmazonRDSClient();
await rds.CreateDBInstanceAsync(new() {
    DBInstanceIdentifier = "mydb", Engine = "postgres",
    DBInstanceClass = "db.t3.micro", AllocatedStorage = 20,
    MasterUsername = "admin", MasterUserPassword = "****" });`,
  azCli:`az postgres flexible-server create -g myRG \\
  --name mydb --admin-user admin \\
  --admin-password ****`,
  azPy:`from azure.mgmt.rdbms.postgresql_flexibleservers \\
    import PostgreSQLManagementClient
p = PostgreSQLManagementClient(
    DefaultAzureCredential(), SUB_ID)
p.servers.begin_create("myRG", "mydb", server_params)`,
  azCs:`await rg.GetPostgreSqlFlexibleServers()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "mydb", serverData);`},

 {cat:"Databases", icon:"🗄️", aws:"Amazon Aurora", az:"Azure SQL Database (Hyperscale)",
  desc:"High-performance, auto-scaling cloud-native relational database.",
  ex:"Scale a transactional database to terabytes with fast reads.",
  awsUrl:"https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/", azUrl:"https://learn.microsoft.com/en-us/azure/azure-sql/database/service-tier-hyperscale",
  awsCli:`aws rds create-db-cluster \\
  --db-cluster-identifier my-aurora \\
  --engine aurora-postgresql \\
  --master-username admin --master-user-password ****`,
  awsPy:`import boto3
boto3.client("rds").create_db_cluster(
    DBClusterIdentifier="my-aurora",
    Engine="aurora-postgresql",
    MasterUsername="admin", MasterUserPassword="****")`,
  awsCs:`await rds.CreateDBClusterAsync(new() {
    DBClusterIdentifier = "my-aurora",
    Engine = "aurora-postgresql",
    MasterUsername = "admin",
    MasterUserPassword = "****" });`,
  azCli:`az sql db create -g myRG -s myServer \\
  -n myDB --edition Hyperscale \\
  --family Gen5 --capacity 2`,
  azPy:`from azure.mgmt.sql import SqlManagementClient
s = SqlManagementClient(DefaultAzureCredential(), SUB_ID)
s.databases.begin_create_or_update(
    "myRG", "myServer", "myDB",
    {"location": "eastus", "sku": {"name": "HS_Gen5_2"}})`,
  azCs:`await sqlServer.GetSqlDatabases().CreateOrUpdateAsync(
    WaitUntil.Completed, "myDB",
    new SqlDatabaseData(loc) { Sku = new("HS_Gen5_2") });`},

 {cat:"Databases", icon:"🗄️", aws:"Amazon DynamoDB", az:"Azure Cosmos DB",
  desc:"Globally distributed, low-latency NoSQL database.",
  ex:"Store session/user state with single-digit-ms reads worldwide.",
  awsUrl:"https://docs.aws.amazon.com/dynamodb/", azUrl:"https://learn.microsoft.com/en-us/azure/cosmos-db/",
  awsCli:`aws dynamodb put-item --table-name Users \\
  --item '{"id":{"S":"u1"},"name":{"S":"Ada"}}'`,
  awsPy:`import boto3
boto3.resource("dynamodb").Table("Users").put_item(
    Item={"id": "u1", "name": "Ada"})`,
  awsCs:`var ddb = new AmazonDynamoDBClient();
await ddb.PutItemAsync("Users", new() {
    ["id"] = new("u1"), ["name"] = new("Ada") });`,
  azCli:`az cosmosdb create -g myRG -n mycosmos
az cosmosdb sql database create \\
  -g myRG -a mycosmos -n mydb`,
  azPy:`from azure.cosmos import CosmosClient
c = CosmosClient(URL, KEY)
c.get_database_client("mydb") \\
    .get_container_client("users") \\
    .upsert_item({"id": "u1", "name": "Ada"})`,
  azCs:`var cosmos = new CosmosClient(url, key);
var ctn = cosmos.GetContainer("mydb", "users");
await ctn.UpsertItemAsync(new { id = "u1", name = "Ada" });`},

 {cat:"Databases", icon:"🗄️", aws:"Amazon ElastiCache", az:"Azure Cache for Redis",
  desc:"In-memory caching to speed up apps and reduce database load.",
  ex:"Cache hot query results to cut page latency.",
  awsUrl:"https://docs.aws.amazon.com/elasticache/", azUrl:"https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/",
  awsCli:`aws elasticache create-cache-cluster \\
  --cache-cluster-id my-redis --engine redis \\
  --cache-node-type cache.t3.micro --num-cache-nodes 1`,
  awsPy:`import redis
r = redis.Redis(
    host="my-redis.xxx.cache.amazonaws.com", port=6379)
r.set("key", "value")`,
  awsCs:`var mux = ConnectionMultiplexer.Connect(
    "my-redis.xxx.cache.amazonaws.com:6379");
mux.GetDatabase().StringSet("key", "value");`,
  azCli:`az redis create -g myRG -n myRedis \\
  --location eastus --sku Basic --vm-size c0`,
  azPy:`import redis
r = redis.Redis(
    host="myRedis.redis.cache.windows.net",
    port=6380, password=KEY, ssl=True)
r.set("key", "value")`,
  azCs:`var mux = ConnectionMultiplexer.Connect(
    "myRedis.redis.cache.windows.net:6380," +
    "password=KEY,ssl=True");
mux.GetDatabase().StringSet("key", "value");`},

 {cat:"Databases", icon:"🗄️", aws:"Amazon Neptune", az:"Azure Cosmos DB for Apache Gremlin",
  desc:"Managed graph database for highly connected data.",
  ex:"Model a social or recommendation graph.",
  awsUrl:"https://docs.aws.amazon.com/neptune/", azUrl:"https://learn.microsoft.com/en-us/azure/cosmos-db/gremlin/introduction",
  awsCli:`aws neptune create-db-cluster \\
  --db-cluster-identifier my-graph --engine neptune`,
  awsPy:`from gremlin_python.driver import client
c = client.Client("wss://my-graph:8182/gremlin", "g")
c.submit(
    "g.addV('person').property('name','Ada')").all().result()`,
  awsCs:`var server = new GremlinServer("my-graph", 8182);
await new GremlinClient(server).SubmitAsync<dynamic>(
    "g.addV('person').property('name','Ada')");`,
  azCli:`az cosmosdb create -g myRG -n mygraph \\
  --capabilities EnableGremlin`,
  azPy:`from gremlin_python.driver import client
c = client.Client(
    "wss://mygraph.gremlin.cosmos.azure.com:443/", "g",
    username="/dbs/db/colls/graph", password=KEY)
c.submit("g.addV('person')").all().result()`,
  azCs:`var server = new GremlinServer(
    "mygraph.gremlin.cosmos.azure.com", 443, true,
    "/dbs/db/colls/graph", KEY);
await new GremlinClient(server)
    .SubmitAsync<dynamic>("g.addV('person')");`},

 {cat:"Databases", icon:"🗄️", aws:"Amazon DocumentDB", az:"Azure Cosmos DB for MongoDB",
  desc:"Managed document database with MongoDB compatibility.",
  ex:"Migrate a MongoDB app with minimal code changes.",
  awsUrl:"https://docs.aws.amazon.com/documentdb/", azUrl:"https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/",
  awsCli:`aws docdb create-db-cluster \\
  --db-cluster-identifier my-docdb --engine docdb \\
  --master-username admin --master-user-password ****`,
  awsPy:`from pymongo import MongoClient
db = MongoClient(
    "mongodb://admin:****@my-docdb:27017").mydb
db.users.insert_one({"name": "Ada"})`,
  awsCs:`var db = new MongoClient(
    "mongodb://admin:****@my-docdb:27017")
    .GetDatabase("mydb");
await db.GetCollection<BsonDocument>("users")
    .InsertOneAsync(new("name", "Ada"));`,
  azCli:`az cosmosdb create -g myRG -n mymongo \\
  --kind MongoDB`,
  azPy:`from pymongo import MongoClient
db = MongoClient(COSMOS_MONGO_CONN).mydb
db.users.insert_one({"name": "Ada"})`,
  azCs:`var db = new MongoClient(cosmosMongoConn)
    .GetDatabase("mydb");
await db.GetCollection<BsonDocument>("users")
    .InsertOneAsync(new("name", "Ada"));`},

 {cat:"Networking", icon:"🌐", aws:"Amazon VPC", az:"Azure Virtual Network (VNet)",
  desc:"Isolated private network for your cloud resources.",
  ex:"Segment app, data, and DMZ tiers into subnets.",
  awsUrl:"https://docs.aws.amazon.com/vpc/", azUrl:"https://learn.microsoft.com/en-us/azure/virtual-network/",
  awsCli:`aws ec2 create-vpc --cidr-block 10.0.0.0/16`,
  awsPy:`import boto3
boto3.client("ec2").create_vpc(CidrBlock="10.0.0.0/16")`,
  awsCs:`var ec2 = new AmazonEC2Client();
await ec2.CreateVpcAsync(new() {
    CidrBlock = "10.0.0.0/16" });`,
  azCli:`az network vnet create -g myRG -n myVNet \\
  --address-prefix 10.0.0.0/16 \\
  --subnet-name default --subnet-prefix 10.0.0.0/24`,
  azPy:`from azure.mgmt.network import NetworkManagementClient
n = NetworkManagementClient(DefaultAzureCredential(), SUB_ID)
n.virtual_networks.begin_create_or_update("myRG", "myVNet", {
    "location": "eastus",
    "address_space": {"address_prefixes": ["10.0.0.0/16"]}})`,
  azCs:`await rg.GetVirtualNetworks().CreateOrUpdateAsync(
    WaitUntil.Completed, "myVNet", vnetData);`},

 {cat:"Networking", icon:"🌐", aws:"Elastic Load Balancing", az:"Azure Load Balancer / Application Gateway",
  desc:"Distribute traffic across servers for scale and availability.",
  ex:"Balance HTTP traffic across a VM scale set with WAF.",
  awsUrl:"https://docs.aws.amazon.com/elasticloadbalancing/", azUrl:"https://learn.microsoft.com/en-us/azure/application-gateway/",
  awsCli:`aws elbv2 create-load-balancer --name my-alb \\
  --subnets subnet-abc subnet-def`,
  awsPy:`import boto3
boto3.client("elbv2").create_load_balancer(
    Name="my-alb", Subnets=["subnet-abc", "subnet-def"])`,
  awsCs:`var elb = new AmazonElasticLoadBalancingV2Client();
await elb.CreateLoadBalancerAsync(new() {
    Name = "my-alb",
    Subnets = new() { "subnet-abc", "subnet-def" } });`,
  azCli:`az network application-gateway create -g myRG \\
  -n myAppGW --capacity 2 --sku Standard_v2 \\
  --vnet-name myVNet --subnet appgwSubnet`,
  azPy:`n.application_gateways.begin_create_or_update(
    "myRG", "myAppGW", gateway_params)`,
  azCs:`await rg.GetApplicationGateways().CreateOrUpdateAsync(
    WaitUntil.Completed, "myAppGW", gwData);`},

 {cat:"Networking", icon:"🌐", aws:"Amazon Route 53", az:"Azure DNS / Traffic Manager",
  desc:"DNS hosting and global DNS-based traffic routing.",
  ex:"Route users to the nearest healthy region.",
  awsUrl:"https://docs.aws.amazon.com/route53/", azUrl:"https://learn.microsoft.com/en-us/azure/traffic-manager/",
  awsCli:`aws route53 create-hosted-zone \\
  --name example.com --caller-reference $(date +%s)`,
  awsPy:`import boto3, time
boto3.client("route53").create_hosted_zone(
    Name="example.com", CallerReference=str(time.time()))`,
  awsCs:`var r53 = new AmazonRoute53Client();
await r53.CreateHostedZoneAsync(new() {
    Name = "example.com",
    CallerReference = Guid.NewGuid().ToString() });`,
  azCli:`az network traffic-manager profile create -g myRG \\
  -n myTM --routing-method Performance \\
  --unique-dns-name myapp`,
  azPy:`from azure.mgmt.trafficmanager import (
    TrafficManagerManagementClient)
t = TrafficManagerManagementClient(
    DefaultAzureCredential(), SUB_ID)
t.profiles.create_or_update("myRG", "myTM", profile)`,
  azCs:`var tm = new TrafficManagerManagementClient(cred)
    { SubscriptionId = subId };
await tm.Profiles.CreateOrUpdateAsync(
    "myRG", "myTM", profile);`},

 {cat:"Networking", icon:"🌐", aws:"Amazon CloudFront", az:"Azure Front Door / Azure CDN",
  desc:"Content delivery network and global edge acceleration.",
  ex:"Cache and accelerate a global website at the edge.",
  awsUrl:"https://docs.aws.amazon.com/cloudfront/", azUrl:"https://learn.microsoft.com/en-us/azure/frontdoor/",
  awsCli:`aws cloudfront create-distribution \\
  --origin-domain-name my-bucket.s3.amazonaws.com`,
  awsPy:`import boto3
boto3.client("cloudfront").create_distribution(
    DistributionConfig=dist_config)`,
  awsCs:`var cf = new AmazonCloudFrontClient();
await cf.CreateDistributionAsync(new() {
    DistributionConfig = distConfig });`,
  azCli:`az afd profile create -g myRG \\
  --profile-name myFrontDoor \\
  --sku Standard_AzureFrontDoor`,
  azPy:`from azure.mgmt.cdn import CdnManagementClient
c = CdnManagementClient(DefaultAzureCredential(), SUB_ID)
c.profiles.begin_create("myRG", "myFrontDoor", profile)`,
  azCs:`await rg.GetProfiles().CreateOrUpdateAsync(
    WaitUntil.Completed, "myFrontDoor", profileData);`},

 {cat:"Networking", icon:"🌐", aws:"AWS Direct Connect", az:"Azure ExpressRoute",
  desc:"Dedicated private connectivity between on-prem and the cloud.",
  ex:"Get a private, predictable link from a data center to the cloud.",
  awsUrl:"https://docs.aws.amazon.com/directconnect/", azUrl:"https://learn.microsoft.com/en-us/azure/expressroute/",
  awsCli:`aws directconnect create-connection \\
  --location EqDC2 --bandwidth 1Gbps \\
  --connection-name my-conn`,
  awsPy:`import boto3
boto3.client("directconnect").create_connection(
    location="EqDC2", bandwidth="1Gbps",
    connectionName="my-conn")`,
  awsCs:`var dc = new AmazonDirectConnectClient();
await dc.CreateConnectionAsync(new() {
    Location = "EqDC2", Bandwidth = "1Gbps",
    ConnectionName = "my-conn" });`,
  azCli:`az network express-route create -g myRG \\
  -n myCircuit --bandwidth 200 --provider Equinix \\
  --peering-location "Silicon Valley" --sku-tier Standard`,
  azPy:`n.express_route_circuits.begin_create_or_update(
    "myRG", "myCircuit", circuit_params)`,
  azCs:`await rg.GetExpressRouteCircuits().CreateOrUpdateAsync(
    WaitUntil.Completed, "myCircuit", circuitData);`},

 {cat:"Networking", icon:"🌐", aws:"AWS Transit Gateway", az:"Azure Virtual WAN",
  desc:"Hub to connect many networks and branches at scale.",
  ex:"Centralize connectivity across regions and offices.",
  awsUrl:"https://docs.aws.amazon.com/vpc/latest/tgw/", azUrl:"https://learn.microsoft.com/en-us/azure/virtual-wan/",
  awsCli:`aws ec2 create-transit-gateway \\
  --description "central hub"`,
  awsPy:`import boto3
boto3.client("ec2").create_transit_gateway(
    Description="central hub")`,
  awsCs:`await ec2.CreateTransitGatewayAsync(new() {
    Description = "central hub" });`,
  azCli:`az network vwan create -g myRG \\
  -n myVWAN --type Standard`,
  azPy:`n.virtual_wans.begin_create_or_update("myRG", "myVWAN", {
    "location": "eastus", "type": "Standard"})`,
  azCs:`await rg.GetVirtualWans().CreateOrUpdateAsync(
    WaitUntil.Completed, "myVWAN", wanData);`},

 {cat:"Analytics", icon:"📊", aws:"Amazon Redshift", az:"Azure Synapse Analytics",
  desc:"Cloud data warehouse for large-scale analytics and BI.",
  ex:"Run analytical queries over billions of rows.",
  awsUrl:"https://docs.aws.amazon.com/redshift/", azUrl:"https://learn.microsoft.com/en-us/azure/synapse-analytics/",
  awsCli:`aws redshift create-cluster \\
  --cluster-identifier my-dw --node-type ra3.xlplus \\
  --master-username admin --master-user-password **** \\
  --number-of-nodes 2`,
  awsPy:`import boto3
boto3.client("redshift").create_cluster(
    ClusterIdentifier="my-dw", NodeType="ra3.xlplus",
    MasterUsername="admin", MasterUserPassword="****",
    NumberOfNodes=2)`,
  awsCs:`var rs = new AmazonRedshiftClient();
await rs.CreateClusterAsync(new() {
    ClusterIdentifier = "my-dw", NodeType = "ra3.xlplus",
    MasterUsername = "admin", MasterUserPassword = "****",
    NumberOfNodes = 2 });`,
  azCli:`az synapse workspace create -g myRG \\
  -n myWorkspace --storage-account myadls \\
  --file-system myfs \\
  --sql-admin-login-user admin \\
  --sql-admin-login-password ****`,
  azPy:`from azure.mgmt.synapse import SynapseManagementClient
s = SynapseManagementClient(DefaultAzureCredential(), SUB_ID)
s.workspaces.begin_create_or_update("myRG", "myWorkspace", ws)`,
  azCs:`await rg.GetSynapseWorkspaces().CreateOrUpdateAsync(
    WaitUntil.Completed, "myWorkspace", wsData);`},

 {cat:"Analytics", icon:"📊", aws:"Amazon EMR", az:"Azure HDInsight / Databricks",
  desc:"Managed big-data frameworks (Spark, Hadoop) for processing at scale.",
  ex:"Run a Spark ETL pipeline over petabytes.",
  awsUrl:"https://docs.aws.amazon.com/emr/", azUrl:"https://learn.microsoft.com/en-us/azure/hdinsight/",
  awsCli:`aws emr create-cluster --name "spark" \\
  --release-label emr-7.0.0 \\
  --applications Name=Spark \\
  --instance-type m5.xlarge --instance-count 3`,
  awsPy:`import boto3
boto3.client("emr").run_job_flow(
    Name="spark", ReleaseLabel="emr-7.0.0",
    Applications=[{"Name": "Spark"}], Instances=instances)`,
  awsCs:`var emr = new AmazonElasticMapReduceClient();
await emr.RunJobFlowAsync(new() {
    Name = "spark", ReleaseLabel = "emr-7.0.0",
    Instances = instances });`,
  azCli:`az hdinsight create -g myRG -n mySpark \\
  --type Spark --component-version Spark=3.3 \\
  --http-password **** --storage-account myadls`,
  azPy:`from azure.mgmt.hdinsight import (
    HDInsightManagementClient)
h = HDInsightManagementClient(
    DefaultAzureCredential(), SUB_ID)
h.clusters.begin_create("myRG", "mySpark", cluster_params)`,
  azCs:`await rg.GetHDInsightClusters().CreateOrUpdateAsync(
    WaitUntil.Completed, "mySpark", clusterData);`},

 {cat:"Analytics", icon:"📊", aws:"Amazon Kinesis", az:"Azure Event Hubs / Stream Analytics",
  desc:"Ingest and process real-time streaming data.",
  ex:"Stream and analyze clickstream or telemetry live.",
  awsUrl:"https://docs.aws.amazon.com/kinesis/", azUrl:"https://learn.microsoft.com/en-us/azure/event-hubs/",
  awsCli:`aws kinesis put-record --stream-name my-stream \\
  --partition-key p1 --data "event"`,
  awsPy:`import boto3
boto3.client("kinesis").put_record(
    StreamName="my-stream", Data=b"event",
    PartitionKey="p1")`,
  awsCs:`var k = new AmazonKinesisClient();
await k.PutRecordAsync(new() {
    StreamName = "my-stream",
    Data = new MemoryStream(bytes),
    PartitionKey = "p1" });`,
  azCli:`az eventhubs eventhub create -g myRG \\
  --namespace-name myNS -n myhub --partition-count 4`,
  azPy:`from azure.eventhub import (
    EventHubProducerClient, EventData)
p = EventHubProducerClient.from_connection_string(
    CONN, eventhub_name="myhub")
p.send_batch([EventData("event")])`,
  azCs:`var producer = new EventHubProducerClient(conn, "myhub");
using var batch = await producer.CreateBatchAsync();
batch.TryAdd(new EventData("event"));
await producer.SendAsync(batch);`},

 {cat:"Analytics", icon:"📊", aws:"AWS Glue", az:"Azure Data Factory",
  desc:"Serverless data integration / ETL and orchestration.",
  ex:"Build a pipeline that moves and transforms data nightly.",
  awsUrl:"https://docs.aws.amazon.com/glue/", azUrl:"https://learn.microsoft.com/en-us/azure/data-factory/",
  awsCli:`aws glue start-job-run --job-name my-etl`,
  awsPy:`import boto3
boto3.client("glue").start_job_run(JobName="my-etl")`,
  awsCs:`var glue = new AmazonGlueClient();
await glue.StartJobRunAsync(new() { JobName = "my-etl" });`,
  azCli:`az datafactory pipeline create-run -g myRG \\
  --factory-name myADF --name myPipeline`,
  azPy:`from azure.mgmt.datafactory import (
    DataFactoryManagementClient)
df = DataFactoryManagementClient(
    DefaultAzureCredential(), SUB_ID)
df.pipelines.create_run("myRG", "myADF", "myPipeline")`,
  azCs:`await dataFactory.GetDataFactoryPipelines()
    .Get("myPipeline").Value.CreateRunAsync();`},

 {cat:"Analytics", icon:"📊", aws:"Amazon Athena", az:"Azure Synapse Serverless SQL",
  desc:"Query data directly in object storage with SQL, no servers.",
  ex:"Run ad-hoc SQL over Parquet files in storage.",
  awsUrl:"https://docs.aws.amazon.com/athena/", azUrl:"https://learn.microsoft.com/en-us/azure/synapse-analytics/sql/on-demand-workspace-overview",
  awsCli:`aws athena start-query-execution \\
  --query-string "SELECT * FROM logs LIMIT 10" \\
  --result-configuration OutputLocation=s3://b/out/`,
  awsPy:`import boto3
boto3.client("athena").start_query_execution(
    QueryString="SELECT * FROM logs LIMIT 10",
    ResultConfiguration={"OutputLocation": "s3://b/out/"})`,
  awsCs:`var a = new AmazonAthenaClient();
await a.StartQueryExecutionAsync(new() {
    QueryString = "SELECT * FROM logs LIMIT 10",
    ResultConfiguration = new()
        { OutputLocation = "s3://b/out/" } });`,
  azCli:`-- Connect to the serverless SQL endpoint and run:
SELECT TOP 10 * FROM OPENROWSET(
  BULK 'https://acct.dfs.core.windows.net/fs/*.parquet',
  FORMAT='PARQUET') AS rows;`,
  azPy:`import pyodbc
cn = pyodbc.connect(SERVERLESS_SQL_CONN)
cn.cursor().execute(
    "SELECT TOP 10 * FROM OPENROWSET(...)").fetchall()`,
  azCs:`using var cn = new SqlConnection(serverlessSqlConn);
await cn.OpenAsync();
new SqlCommand(
    "SELECT TOP 10 * FROM OPENROWSET(...)", cn)
    .ExecuteReader();`},

 {cat:"Analytics", icon:"📊", aws:"Amazon QuickSight", az:"Power BI",
  desc:"Business intelligence dashboards and visualizations.",
  ex:"Build an interactive sales dashboard for execs.",
  awsUrl:"https://docs.aws.amazon.com/quicksight/", azUrl:"https://learn.microsoft.com/en-us/power-bi/",
  awsCli:`aws quicksight create-data-source \\
  --aws-account-id 123 --data-source-id ds1 \\
  --name "My DS" --type ATHENA`,
  awsPy:`import boto3
boto3.client("quicksight").create_data_source(
    AwsAccountId="123", DataSourceId="ds1",
    Name="My DS", Type="ATHENA")`,
  awsCs:`var qs = new AmazonQuickSightClient();
await qs.CreateDataSourceAsync(new() {
    AwsAccountId = "123", DataSourceId = "ds1",
    Name = "My DS", Type = DataSourceType.ATHENA });`,
  azCli:`# Author in Power BI Desktop, then publish:
pbicli reports upload --file report.pbix --workspace ws`,
  azPy:`import requests
requests.post(
    "https://api.powerbi.com/v1.0/myorg/groups/{id}/imports",
    headers={"Authorization": f"Bearer {token}"},
    files={"file": open("report.pbix", "rb")})`,
  azCs:`var pbi = new PowerBIClient(
    new TokenCredentials(token));
await pbi.Imports.PostImportWithFileInGroupAsync(
    groupId, stream, "report");`},

 {cat:"Analytics", icon:"📊", aws:"Amazon OpenSearch Service", az:"Azure AI Search",
  desc:"Search and analytics over text and log data.",
  ex:"Add full-text search and log analytics to an app.",
  awsUrl:"https://docs.aws.amazon.com/opensearch-service/", azUrl:"https://learn.microsoft.com/en-us/azure/search/",
  awsCli:`aws opensearch create-domain \\
  --domain-name my-search \\
  --engine-version OpenSearch_2.11`,
  awsPy:`from opensearchpy import OpenSearch
client = OpenSearch(hosts=[{"host": HOST, "port": 443}],
    http_auth=auth, use_ssl=True)
client.index(index="idx", body={"text": "hello"})`,
  awsCs:`var os = new AmazonOpenSearchServiceClient();
await os.CreateDomainAsync(new() {
    DomainName = "my-search",
    EngineVersion = "OpenSearch_2.11" });`,
  azCli:`az search service create -g myRG \\
  -n mySearch --sku standard`,
  azPy:`from azure.search.documents import SearchClient
from azure.core.credentials import AzureKeyCredential
SearchClient(ENDPOINT, "idx", AzureKeyCredential(KEY)) \\
    .upload_documents([{"id": "1", "text": "hello"}])`,
  azCs:`var sc = new SearchClient(endpoint, "idx",
    new AzureKeyCredential(key));
await sc.UploadDocumentsAsync(
    new[] { new { id = "1", text = "hello" } });`},

 {cat:"AI / ML", icon:"🤖", aws:"Amazon SageMaker", az:"Azure Machine Learning",
  desc:"End-to-end platform to build, train, and deploy ML models.",
  ex:"Train and host a custom churn-prediction model.",
  awsUrl:"https://docs.aws.amazon.com/sagemaker/", azUrl:"https://learn.microsoft.com/en-us/azure/machine-learning/",
  awsCli:`aws sagemaker create-training-job \\
  --training-job-name my-job \\
  --algorithm-specification ... --role-arn <role>`,
  awsPy:`import boto3
boto3.client("sagemaker").create_training_job(
    TrainingJobName="my-job", RoleArn=ROLE,
    AlgorithmSpecification=algo, OutputDataConfig=out,
    ResourceConfig=res, StoppingCondition=stop)`,
  awsCs:`var sm = new AmazonSageMakerClient();
await sm.CreateTrainingJobAsync(new() {
    TrainingJobName = "my-job", RoleArn = role,
    AlgorithmSpecification = algo });`,
  azCli:`az ml job create -g myRG \\
  -w myWorkspace --file job.yml`,
  azPy:`from azure.ai.ml import MLClient, command
ml = MLClient(DefaultAzureCredential(),
    SUB, "myRG", "myWorkspace")
ml.jobs.create_or_update(
    command(command="python train.py", environment=env))`,
  azCs:`// Azure ML is driven via the Python / CLI v2 SDK.
// .NET uses the management plane:
//   Azure.ResourceManager.MachineLearning`},

 {cat:"AI / ML", icon:"🤖", aws:"Amazon Bedrock", az:"Azure OpenAI Service / Azure AI Foundry",
  desc:"Access foundation/large language models via managed APIs.",
  ex:"Build a chatbot or RAG app on top of LLMs.",
  awsUrl:"https://docs.aws.amazon.com/bedrock/", azUrl:"https://learn.microsoft.com/en-us/azure/ai-services/openai/",
  awsCli:`aws bedrock-runtime invoke-model \\
  --model-id anthropic.claude-3-sonnet-20240229-v1:0 \\
  --body '{"prompt":"Hello"}' out.json`,
  awsPy:`import boto3, json
r = boto3.client("bedrock-runtime").invoke_model(
    modelId="anthropic.claude-3-sonnet-20240229-v1:0",
    body=json.dumps({"prompt": "Hello"}))`,
  awsCs:`var br = new AmazonBedrockRuntimeClient();
await br.InvokeModelAsync(new() {
    ModelId = "anthropic.claude-3-sonnet-20240229-v1:0",
    Body = new MemoryStream(bodyBytes) });`,
  azCli:`curl "$ENDPOINT/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-01" \\
  -H "api-key: $KEY" -H "Content-Type: application/json" \\
  -d '{"messages":[{"role":"user","content":"Hello"}]}'`,
  azPy:`from openai import AzureOpenAI
c = AzureOpenAI(azure_endpoint=ENDPOINT, api_key=KEY,
    api_version="2024-02-01")
c.chat.completions.create(model="gpt-4o",
    messages=[{"role": "user", "content": "Hello"}])`,
  azCs:`var c = new AzureOpenAIClient(new Uri(endpoint),
    new AzureKeyCredential(key));
var chat = c.GetChatClient("gpt-4o");
await chat.CompleteChatAsync("Hello");`},

 {cat:"AI / ML", icon:"🤖", aws:"Amazon Rekognition", az:"Azure AI Vision",
  desc:"Pre-built image and video analysis (objects, faces, text).",
  ex:"Detect objects or moderate content in user images.",
  awsUrl:"https://docs.aws.amazon.com/rekognition/", azUrl:"https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/",
  awsCli:`aws rekognition detect-labels \\
  --image '{"S3Object":{"Bucket":"b","Name":"img.jpg"}}'`,
  awsPy:`import boto3
boto3.client("rekognition").detect_labels(
    Image={"S3Object": {"Bucket": "b", "Name": "img.jpg"}})`,
  awsCs:`var rek = new AmazonRekognitionClient();
await rek.DetectLabelsAsync(new() {
    Image = new() { S3Object = new()
        { Bucket = "b", Name = "img.jpg" } } });`,
  azCli:`curl -H "Ocp-Apim-Subscription-Key: $KEY" \\
  "$ENDPOINT/vision/v3.2/analyze?visualFeatures=Objects" \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://.../img.jpg"}'`,
  azPy:`from azure.ai.vision.imageanalysis import (
    ImageAnalysisClient)
from azure.core.credentials import AzureKeyCredential
ImageAnalysisClient(ENDPOINT, AzureKeyCredential(KEY)) \\
    .analyze_from_url(URL, visual_features=["Objects"])`,
  azCs:`var client = new ImageAnalysisClient(
    new Uri(endpoint), new AzureKeyCredential(key));
await client.AnalyzeAsync(
    new Uri(url), VisualFeatures.Objects);`},

 {cat:"AI / ML", icon:"🤖", aws:"Amazon Comprehend", az:"Azure AI Language",
  desc:"Natural-language processing (sentiment, entities, key phrases).",
  ex:"Analyze sentiment of customer support tickets.",
  awsUrl:"https://docs.aws.amazon.com/comprehend/", azUrl:"https://learn.microsoft.com/en-us/azure/ai-services/language-service/",
  awsCli:`aws comprehend detect-sentiment \\
  --text "I love this product" --language-code en`,
  awsPy:`import boto3
boto3.client("comprehend").detect_sentiment(
    Text="I love this product", LanguageCode="en")`,
  awsCs:`var c = new AmazonComprehendClient();
await c.DetectSentimentAsync(new() {
    Text = "I love this product",
    LanguageCode = "en" });`,
  azCli:`curl -H "Ocp-Apim-Subscription-Key: $KEY" \\
  "$ENDPOINT/text/analytics/v3.1/sentiment" \\
  -d '{"documents":[{"id":"1","language":"en","text":"I love this"}]}'`,
  azPy:`from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
TextAnalyticsClient(ENDPOINT, AzureKeyCredential(KEY)) \\
    .analyze_sentiment(["I love this"])`,
  azCs:`var c = new TextAnalyticsClient(new Uri(endpoint),
    new AzureKeyCredential(key));
await c.AnalyzeSentimentAsync("I love this");`},

 {cat:"AI / ML", icon:"🤖", aws:"Amazon Transcribe", az:"Azure AI Speech",
  desc:"Speech-to-text and text-to-speech services.",
  ex:"Transcribe call recordings into searchable text.",
  awsUrl:"https://docs.aws.amazon.com/transcribe/", azUrl:"https://learn.microsoft.com/en-us/azure/ai-services/speech-service/",
  awsCli:`aws transcribe start-transcription-job \\
  --transcription-job-name job1 \\
  --media MediaFileUri=s3://b/audio.mp3 \\
  --language-code en-US`,
  awsPy:`import boto3
boto3.client("transcribe").start_transcription_job(
    TranscriptionJobName="job1", LanguageCode="en-US",
    Media={"MediaFileUri": "s3://b/audio.mp3"})`,
  awsCs:`var t = new AmazonTranscribeServiceClient();
await t.StartTranscriptionJobAsync(new() {
    TranscriptionJobName = "job1", LanguageCode = "en-US",
    Media = new() { MediaFileUri = "s3://b/audio.mp3" } });`,
  azCli:`curl -H "Ocp-Apim-Subscription-Key: $KEY" \\
  "$ENDPOINT/speechtotext/v3.1/transcriptions" \\
  -d '{"contentUrls":["https://.../audio.wav"],"locale":"en-US"}'`,
  azPy:`import azure.cognitiveservices.speech as speechsdk
cfg = speechsdk.SpeechConfig(
    subscription=KEY, region=REGION)
r = speechsdk.SpeechRecognizer(cfg).recognize_once()`,
  azCs:`var cfg = SpeechConfig.FromSubscription(key, region);
using var rec = new SpeechRecognizer(cfg);
var result = await rec.RecognizeOnceAsync();`},

 {cat:"AI / ML", icon:"🤖", aws:"Amazon Translate", az:"Azure AI Translator",
  desc:"Real-time machine translation across languages.",
  ex:"Localize app content into 50+ languages.",
  awsUrl:"https://docs.aws.amazon.com/translate/", azUrl:"https://learn.microsoft.com/en-us/azure/ai-services/translator/",
  awsCli:`aws translate translate-text --text "Hello" \\
  --source-language-code en --target-language-code es`,
  awsPy:`import boto3
boto3.client("translate").translate_text(
    Text="Hello", SourceLanguageCode="en",
    TargetLanguageCode="es")`,
  awsCs:`var t = new AmazonTranslateClient();
await t.TranslateTextAsync(new() {
    Text = "Hello", SourceLanguageCode = "en",
    TargetLanguageCode = "es" });`,
  azCli:`curl -H "Ocp-Apim-Subscription-Key: $KEY" \\
  "$ENDPOINT/translate?api-version=3.0&to=es" \\
  -H "Content-Type: application/json" \\
  -d '[{"Text":"Hello"}]'`,
  azPy:`from azure.ai.translation.text import (
    TextTranslationClient)
from azure.core.credentials import AzureKeyCredential
TextTranslationClient(
    credential=AzureKeyCredential(KEY), region=REGION) \\
    .translate(body=["Hello"], to_language=["es"])`,
  azCs:`var c = new TextTranslationClient(
    new AzureKeyCredential(key), region);
await c.TranslateAsync(
    new[] { "es" }, new[] { "Hello" });`},

 {cat:"Security & Identity", icon:"🔐", aws:"AWS IAM", az:"Microsoft Entra ID + Azure RBAC",
  desc:"Identity and access management — who can do what.",
  ex:"Grant least-privilege access to a team's resources.",
  awsUrl:"https://docs.aws.amazon.com/iam/", azUrl:"https://learn.microsoft.com/en-us/entra/fundamentals/",
  awsCli:`aws iam attach-role-policy --role-name MyRole \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess`,
  awsPy:`import boto3
boto3.client("iam").attach_role_policy(
    RoleName="MyRole",
    PolicyArn="arn:aws:iam::aws:policy/ReadOnlyAccess")`,
  awsCs:`var iam = new AmazonIdentityManagementServiceClient();
await iam.AttachRolePolicyAsync(new() {
    RoleName = "MyRole",
    PolicyArn = "arn:aws:iam::aws:policy/ReadOnlyAccess" });`,
  azCli:`az role assignment create \\
  --assignee user@contoso.com --role Reader \\
  --scope /subscriptions/<id>/resourceGroups/myRG`,
  azPy:`from azure.mgmt.authorization import (
    AuthorizationManagementClient)
a = AuthorizationManagementClient(
    DefaultAzureCredential(), SUB_ID)
a.role_assignments.create(scope, guid,
    {"role_definition_id": rid, "principal_id": pid})`,
  azCs:`var arm = new ArmClient(new DefaultAzureCredential());
await scope.GetRoleAssignments().CreateOrUpdateAsync(
    WaitUntil.Completed,
    Guid.NewGuid().ToString(), content);`},

 {cat:"Security & Identity", icon:"🔐", aws:"AWS KMS", az:"Azure Key Vault",
  desc:"Manage encryption keys, secrets, and certificates.",
  ex:"Store DB passwords and rotate encryption keys.",
  awsUrl:"https://docs.aws.amazon.com/kms/", azUrl:"https://learn.microsoft.com/en-us/azure/key-vault/",
  awsCli:`aws kms create-key
aws kms encrypt --key-id <id> --plaintext fileb://secret`,
  awsPy:`import boto3
kms = boto3.client("kms")
kms.encrypt(KeyId=KEY_ID, Plaintext=b"secret")`,
  awsCs:`var kms = new AmazonKeyManagementServiceClient();
await kms.EncryptAsync(new() {
    KeyId = keyId,
    Plaintext = new MemoryStream(bytes) });`,
  azCli:`az keyvault create -g myRG -n myVault
az keyvault secret set --vault-name myVault \\
  -n dbPassword --value ****`,
  azPy:`from azure.keyvault.secrets import SecretClient
SecretClient("https://myVault.vault.azure.net/",
    DefaultAzureCredential()) \\
    .set_secret("dbPassword", "****")`,
  azCs:`var c = new SecretClient(
    new Uri("https://myVault.vault.azure.net/"),
    new DefaultAzureCredential());
await c.SetSecretAsync("dbPassword", "****");`},

 {cat:"Security & Identity", icon:"🔐", aws:"AWS WAF", az:"Azure Web Application Firewall",
  desc:"Protect web apps from common exploits (SQLi, XSS).",
  ex:"Block malicious requests in front of an app gateway.",
  awsUrl:"https://docs.aws.amazon.com/waf/", azUrl:"https://learn.microsoft.com/en-us/azure/web-application-firewall/",
  awsCli:`aws wafv2 create-web-acl --name my-acl \\
  --scope REGIONAL --default-action Allow={} \\
  --visibility-config ...`,
  awsPy:`import boto3
boto3.client("wafv2").create_web_acl(
    Name="my-acl", Scope="REGIONAL",
    DefaultAction={"Allow": {}}, VisibilityConfig=vis)`,
  awsCs:`var waf = new AmazonWAFV2Client();
await waf.CreateWebACLAsync(new() {
    Name = "my-acl", Scope = Scope.REGIONAL,
    DefaultAction = new() { Allow = new() } });`,
  azCli:`az network application-gateway waf-policy create \\
  -g myRG -n myWafPolicy`,
  azPy:`n.web_application_firewall_policies.create_or_update(
    "myRG", "myWafPolicy", {"location": "eastus"})`,
  azCs:`await rg.GetWebApplicationFirewallPolicies()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "myWafPolicy", policyData);`},

 {cat:"Security & Identity", icon:"🔐", aws:"AWS Shield", az:"Azure DDoS Protection",
  desc:"Protection against distributed denial-of-service attacks.",
  ex:"Absorb volumetric attacks against public endpoints.",
  awsUrl:"https://docs.aws.amazon.com/shield/", azUrl:"https://learn.microsoft.com/en-us/azure/ddos-protection/",
  awsCli:`aws shield create-protection \\
  --name my-protection \\
  --resource-arn <elb-or-cloudfront-arn>`,
  awsPy:`import boto3
boto3.client("shield").create_protection(
    Name="my-protection", ResourceArn=ARN)`,
  awsCs:`var sh = new AmazonShieldClient();
await sh.CreateProtectionAsync(new() {
    Name = "my-protection", ResourceArn = arn });`,
  azCli:`az network ddos-protection create \\
  -g myRG -n myDdosPlan`,
  azPy:`n.ddos_protection_plans.begin_create_or_update(
    "myRG", "myDdosPlan", {"location": "eastus"})`,
  azCs:`await rg.GetDdosProtectionPlans()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "myDdosPlan", planData);`},

 {cat:"Security & Identity", icon:"🔐", aws:"Amazon GuardDuty / Security Hub", az:"Microsoft Defender for Cloud",
  desc:"Threat detection and security posture management.",
  ex:"Get alerts on suspicious activity and misconfigurations.",
  awsUrl:"https://docs.aws.amazon.com/guardduty/", azUrl:"https://learn.microsoft.com/en-us/azure/defender-for-cloud/",
  awsCli:`aws guardduty create-detector --enable`,
  awsPy:`import boto3
boto3.client("guardduty").create_detector(Enable=True)`,
  awsCs:`var gd = new AmazonGuardDutyClient();
await gd.CreateDetectorAsync(new() { Enable = true });`,
  azCli:`az security pricing create \\
  -n VirtualMachines --tier Standard`,
  azPy:`from azure.mgmt.security import SecurityCenter
s = SecurityCenter(DefaultAzureCredential(), SUB_ID)
s.pricings.update("VirtualMachines",
    {"pricing_tier": "Standard"})`,
  azCs:`var sec = new SecurityCenterClient(cred)
    { SubscriptionId = subId };
await sec.Pricings.UpdateAsync("VirtualMachines",
    new Pricing { PricingTier = "Standard" });`},

 {cat:"Security & Identity", icon:"🔐", aws:"Amazon Cognito", az:"Microsoft Entra External ID",
  desc:"Customer identity, sign-up/sign-in, and federation for apps.",
  ex:"Add social/login and user pools to a consumer app.",
  awsUrl:"https://docs.aws.amazon.com/cognito/", azUrl:"https://learn.microsoft.com/en-us/entra/external-id/",
  awsCli:`aws cognito-idp create-user-pool \\
  --pool-name my-users`,
  awsPy:`import boto3
boto3.client("cognito-idp").create_user_pool(
    PoolName="my-users")`,
  awsCs:`var c = new AmazonCognitoIdentityProviderClient();
await c.CreateUserPoolAsync(new() {
    PoolName = "my-users" });`,
  azCli:`az ad app create --display-name myApp \\
  --sign-in-audience AzureADandPersonalMicrosoftAccount`,
  azPy:`from msgraph import GraphServiceClient
from msgraph.generated.models.application import Application
g = GraphServiceClient(DefaultAzureCredential())
await g.applications.post(
    Application(display_name="myApp"))`,
  azCs:`var g = new GraphServiceClient(
    new DefaultAzureCredential());
await g.Applications.PostAsync(
    new Application { DisplayName = "myApp" });`},

 {cat:"Management & DevOps", icon:"🛠️", aws:"Amazon CloudWatch", az:"Azure Monitor",
  desc:"Metrics, logs, and alerts for observability.",
  ex:"Alert on high CPU and dashboard app performance.",
  awsUrl:"https://docs.aws.amazon.com/cloudwatch/", azUrl:"https://learn.microsoft.com/en-us/azure/azure-monitor/",
  awsCli:`aws cloudwatch put-metric-alarm \\
  --alarm-name highCPU --metric-name CPUUtilization \\
  --namespace AWS/EC2 --threshold 80 \\
  --comparison-operator GreaterThanThreshold \\
  --evaluation-periods 2 --period 300 --statistic Average`,
  awsPy:`import boto3
boto3.client("cloudwatch").put_metric_alarm(
    AlarmName="highCPU", MetricName="CPUUtilization",
    Namespace="AWS/EC2", Threshold=80,
    ComparisonOperator="GreaterThanThreshold",
    EvaluationPeriods=2, Period=300, Statistic="Average")`,
  awsCs:`var cw = new AmazonCloudWatchClient();
await cw.PutMetricAlarmAsync(new() {
    AlarmName = "highCPU", MetricName = "CPUUtilization",
    Namespace = "AWS/EC2", Threshold = 80,
    EvaluationPeriods = 2, Period = 300 });`,
  azCli:`az monitor metrics alert create -g myRG \\
  -n highCPU --scopes <vm-id> \\
  --condition "avg Percentage CPU > 80"`,
  azPy:`from azure.mgmt.monitor import MonitorManagementClient
m = MonitorManagementClient(DefaultAzureCredential(), SUB_ID)
m.metric_alerts.create_or_update("myRG", "highCPU", rule)`,
  azCs:`var mon = new MonitorManagementClient(cred)
    { SubscriptionId = subId };
await mon.MetricAlerts.CreateOrUpdateAsync(
    "myRG", "highCPU", rule);`},

 {cat:"Management & DevOps", icon:"🛠️", aws:"AWS CloudFormation", az:"Azure Resource Manager / Bicep",
  desc:"Infrastructure as code to deploy resources declaratively.",
  ex:"Define a full environment in a template and deploy repeatably.",
  awsUrl:"https://docs.aws.amazon.com/cloudformation/", azUrl:"https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/",
  awsCli:`aws cloudformation deploy \\
  --template-file template.yaml \\
  --stack-name my-stack`,
  awsPy:`import boto3
boto3.client("cloudformation").create_stack(
    StackName="my-stack",
    TemplateBody=open("template.yaml").read())`,
  awsCs:`var cfn = new AmazonCloudFormationClient();
await cfn.CreateStackAsync(new() {
    StackName = "my-stack",
    TemplateBody = File.ReadAllText("template.yaml") });`,
  azCli:`az deployment group create -g myRG \\
  --template-file main.bicep`,
  azPy:`from azure.mgmt.resource import (
    ResourceManagementClient)
r = ResourceManagementClient(
    DefaultAzureCredential(), SUB_ID)
r.deployments.begin_create_or_update("myRG", "dep",
    {"properties": {"template": tpl, "mode": "Incremental"}})`,
  azCs:`await rg.GetArmDeployments().CreateOrUpdateAsync(
    WaitUntil.Completed, "dep",
    new ArmDeploymentContent(props));`},

 {cat:"Management & DevOps", icon:"🛠️", aws:"AWS CloudTrail", az:"Azure Monitor Activity Log",
  desc:"Audit log of API calls and control-plane actions.",
  ex:"Trace who deleted a resource and when.",
  awsUrl:"https://docs.aws.amazon.com/cloudtrail/", azUrl:"https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log",
  awsCli:`aws cloudtrail lookup-events --max-results 20`,
  awsPy:`import boto3
events = boto3.client("cloudtrail").lookup_events(
    MaxResults=20)["Events"]`,
  awsCs:`var ct = new AmazonCloudTrailClient();
var r = await ct.LookupEventsAsync(new() {
    MaxResults = 20 });`,
  azCli:`az monitor activity-log list \\
  --resource-group myRG --max-events 20`,
  azPy:`from azure.mgmt.monitor import MonitorManagementClient
for e in m.activity_logs.list(
    filter="resourceGroupName eq 'myRG'"):
    print(e.operation_name.value)`,
  azCs:`await foreach (var e in mon.ActivityLogs.ListAsync(
    "eventTimestamp ge '2026-01-01'"))
    Console.WriteLine(e.OperationName.Value);`},

 {cat:"Management & DevOps", icon:"🛠️", aws:"AWS CodePipeline / CodeBuild", az:"Azure DevOps / GitHub Actions",
  desc:"CI/CD pipelines to build, test, and deploy code.",
  ex:"Auto-deploy on every merge to main.",
  awsUrl:"https://docs.aws.amazon.com/codepipeline/", azUrl:"https://learn.microsoft.com/en-us/azure/devops/pipelines/",
  awsCli:`aws codepipeline start-pipeline-execution \\
  --name myPipeline`,
  awsPy:`import boto3
boto3.client("codepipeline").start_pipeline_execution(
    name="myPipeline")`,
  awsCs:`var cp = new AmazonCodePipelineClient();
await cp.StartPipelineExecutionAsync(new() {
    Name = "myPipeline" });`,
  azCli:`az pipelines run --name myPipeline --branch main`,
  azPy:`import requests
requests.post(
    f"{ORG}/{PROJ}/_apis/pipelines/{id}/runs"
    "?api-version=7.0",
    headers={"Authorization": f"Basic {pat}"})`,
  azCs:`var conn = new VssConnection(new Uri(org),
    new VssBasicCredential("", pat));
await conn.GetClient<PipelinesHttpClient>()
    .RunPipelineAsync(runParams, project, pipelineId);`},

 {cat:"Management & DevOps", icon:"🛠️", aws:"AWS Organizations", az:"Azure Management Groups",
  desc:"Govern many accounts/subscriptions with shared policy.",
  ex:"Apply org-wide guardrails across all subscriptions.",
  awsUrl:"https://docs.aws.amazon.com/organizations/", azUrl:"https://learn.microsoft.com/en-us/azure/governance/management-groups/",
  awsCli:`aws organizations create-account \\
  --email dev@corp.com --account-name "Dev"`,
  awsPy:`import boto3
boto3.client("organizations").create_account(
    Email="dev@corp.com", AccountName="Dev")`,
  awsCs:`var org = new AmazonOrganizationsClient();
await org.CreateAccountAsync(new() {
    Email = "dev@corp.com", AccountName = "Dev" });`,
  azCli:`az account management-group create \\
  --name myMgmtGroup --display-name "Engineering"`,
  azPy:`from azure.mgmt.managementgroups import (
    ManagementGroupsAPI)
mg = ManagementGroupsAPI(DefaultAzureCredential())
mg.management_groups.begin_create_or_update(
    "myMgmtGroup", {"display_name": "Engineering"})`,
  azCs:`var arm = new ArmClient(new DefaultAzureCredential());
await arm.GetManagementGroups().CreateOrUpdateAsync(
    WaitUntil.Completed, "myMgmtGroup", mgData);`},

 {cat:"Management & DevOps", icon:"🛠️", aws:"AWS Cost Explorer", az:"Microsoft Cost Management",
  desc:"Analyze, forecast, and control cloud spend.",
  ex:"Track monthly spend and set budget alerts.",
  awsUrl:"https://docs.aws.amazon.com/cost-management/", azUrl:"https://learn.microsoft.com/en-us/azure/cost-management-billing/",
  awsCli:`aws ce get-cost-and-usage \\
  --time-period Start=2026-01-01,End=2026-02-01 \\
  --granularity MONTHLY --metrics BlendedCost`,
  awsPy:`import boto3
boto3.client("ce").get_cost_and_usage(
    TimePeriod={"Start": "2026-01-01", "End": "2026-02-01"},
    Granularity="MONTHLY", Metrics=["BlendedCost"])`,
  awsCs:`var ce = new AmazonCostExplorerClient();
await ce.GetCostAndUsageAsync(new() {
    TimePeriod = new()
        { Start = "2026-01-01", End = "2026-02-01" },
    Granularity = Granularity.MONTHLY,
    Metrics = new() { "BlendedCost" } });`,
  azCli:`az consumption usage list \\
  --start-date 2026-01-01 --end-date 2026-02-01`,
  azPy:`from azure.mgmt.costmanagement import (
    CostManagementClient)
c = CostManagementClient(DefaultAzureCredential())
c.query.usage(scope, query_definition)`,
  azCs:`var cm = new CostManagementClient(
    new DefaultAzureCredential());
await cm.Query.UsageAsync(scope, queryDefinition);`},

 {cat:"Integration & Messaging", icon:"🔗", aws:"Amazon SQS", az:"Azure Queue Storage / Service Bus",
  desc:"Decouple components with reliable message queues.",
  ex:"Buffer orders between a web app and a worker.",
  awsUrl:"https://docs.aws.amazon.com/sqs/", azUrl:"https://learn.microsoft.com/en-us/azure/service-bus-messaging/",
  awsCli:`aws sqs send-message \\
  --queue-url <url> --message-body "hi"`,
  awsPy:`import boto3
boto3.client("sqs").send_message(
    QueueUrl=URL, MessageBody="hi")`,
  awsCs:`var sqs = new AmazonSQSClient();
await sqs.SendMessageAsync(queueUrl, "hi");`,
  azCli:`az servicebus queue create -g myRG \\
  --namespace-name myNS --name myqueue`,
  azPy:`from azure.servicebus import (
    ServiceBusClient, ServiceBusMessage)
with ServiceBusClient.from_connection_string(CONN) as c:
    c.get_queue_sender("myqueue").send_messages(
        ServiceBusMessage("hi"))`,
  azCs:`await using var client = new ServiceBusClient(conn);
await client.CreateSender("myqueue")
    .SendMessageAsync(new ServiceBusMessage("hi"));`},

 {cat:"Integration & Messaging", icon:"🔗", aws:"Amazon SNS", az:"Azure Event Grid / Notification Hubs",
  desc:"Pub/sub messaging and push notifications.",
  ex:"Fan out an event to many subscribers instantly.",
  awsUrl:"https://docs.aws.amazon.com/sns/", azUrl:"https://learn.microsoft.com/en-us/azure/event-grid/",
  awsCli:`aws sns publish --topic-arn <arn> --message "hi"`,
  awsPy:`import boto3
boto3.client("sns").publish(TopicArn=ARN, Message="hi")`,
  awsCs:`var sns = new AmazonSimpleNotificationServiceClient();
await sns.PublishAsync(topicArn, "hi");`,
  azCli:`az eventgrid topic create -g myRG \\
  -n myTopic --location eastus`,
  azPy:`from azure.eventgrid import (
    EventGridPublisherClient, EventGridEvent)
from azure.core.credentials import AzureKeyCredential
EventGridPublisherClient(
    ENDPOINT, AzureKeyCredential(KEY)).send(
    EventGridEvent(subject="s", event_type="t",
        data={}, data_version="1"))`,
  azCs:`var c = new EventGridPublisherClient(
    new Uri(endpoint), new AzureKeyCredential(key));
await c.SendEventAsync(
    new EventGridEvent("s", "t", "1", data));`},

 {cat:"Integration & Messaging", icon:"🔗", aws:"Amazon API Gateway", az:"Azure API Management",
  desc:"Publish, secure, and manage APIs at scale.",
  ex:"Expose microservices behind a rate-limited gateway.",
  awsUrl:"https://docs.aws.amazon.com/apigateway/", azUrl:"https://learn.microsoft.com/en-us/azure/api-management/",
  awsCli:`aws apigateway create-rest-api --name my-api`,
  awsPy:`import boto3
boto3.client("apigateway").create_rest_api(name="my-api")`,
  awsCs:`var ag = new AmazonAPIGatewayClient();
await ag.CreateRestApiAsync(new() { Name = "my-api" });`,
  azCli:`az apim create -g myRG -n myApim \\
  --publisher-name "Contoso" \\
  --publisher-email admin@contoso.com`,
  azPy:`from azure.mgmt.apimanagement import (
    ApiManagementClient)
a = ApiManagementClient(DefaultAzureCredential(), SUB_ID)
a.api_management_service.begin_create_or_update(
    "myRG", "myApim", svc)`,
  azCs:`await rg.GetApiManagementServices()
    .CreateOrUpdateAsync(WaitUntil.Completed,
        "myApim", apimData);`},

 {cat:"IoT & Edge", icon:"📡", aws:"AWS IoT Core", az:"Azure IoT Hub",
  desc:"Connect, manage, and ingest data from IoT devices.",
  ex:"Stream telemetry from thousands of sensors securely.",
  awsUrl:"https://docs.aws.amazon.com/iot/", azUrl:"https://learn.microsoft.com/en-us/azure/iot-hub/",
  awsCli:`aws iot create-thing --thing-name myDevice`,
  awsPy:`import boto3
boto3.client("iot").create_thing(thingName="myDevice")`,
  awsCs:`var iot = new AmazonIoTClient();
await iot.CreateThingAsync(new() {
    ThingName = "myDevice" });`,
  azCli:`az iot hub create -g myRG -n myIoTHub --sku S1
az iot hub device-identity create \\
  --hub-name myIoTHub -d myDevice`,
  azPy:`from azure.iot.hub import IoTHubRegistryManager
m = IoTHubRegistryManager(IOT_CONN)
m.create_device_with_sas(
    "myDevice", None, None, "enabled")`,
  azCs:`var rm = RegistryManager
    .CreateFromConnectionString(iotConn);
await rm.AddDeviceAsync(new Device("myDevice"));`},

 {cat:"IoT & Edge", icon:"📡", aws:"AWS IoT Greengrass", az:"Azure IoT Edge",
  desc:"Run cloud logic locally on edge devices.",
  ex:"Run ML inference on a factory gateway offline.",
  awsUrl:"https://docs.aws.amazon.com/greengrass/", azUrl:"https://learn.microsoft.com/en-us/azure/iot-edge/",
  awsCli:`aws greengrassv2 create-deployment \\
  --target-arn <core-arn> \\
  --components '{"com.example.App":{"componentVersion":"1.0.0"}}'`,
  awsPy:`import boto3
boto3.client("greengrassv2").create_deployment(
    targetArn=CORE_ARN,
    components={"com.example.App":
        {"componentVersion": "1.0.0"}})`,
  awsCs:`var gg = new AmazonGreengrassV2Client();
await gg.CreateDeploymentAsync(new() {
    TargetArn = coreArn, Components = components });`,
  azCli:`az iot edge set-modules \\
  --hub-name myIoTHub --device-id myEdge \\
  --content deployment.json`,
  azPy:`from azure.iot.hub import (
    IoTHubConfigurationManager)
IoTHubConfigurationManager(IOT_CONN) \\
    .apply_configuration_content("myEdge", content)`,
  azCs:`var rm = RegistryManager
    .CreateFromConnectionString(iotConn);
await rm.ApplyConfigurationContentOnDeviceAsync(
    "myEdge", content);`},

 {cat:"Migration", icon:"🚚", aws:"AWS Migration Hub", az:"Azure Migrate",
  desc:"Discover, assess, and migrate on-prem workloads to the cloud.",
  ex:"Assess VMs and plan a data-center migration.",
  awsUrl:"https://docs.aws.amazon.com/migrationhub/", azUrl:"https://learn.microsoft.com/en-us/azure/migrate/",
  awsCli:`aws migrationhub-config create-home-region-control \\
  --home-region us-west-2 \\
  --target Type=ACCOUNT,Id=123456789012`,
  awsPy:`import boto3
boto3.client("migrationhub-config") \\
    .create_home_region_control(
    HomeRegion="us-west-2",
    Target={"Type": "ACCOUNT", "Id": "123456789012"})`,
  awsCs:`var mh = new AmazonMigrationHubConfigClient();
await mh.CreateHomeRegionControlAsync(new() {
    HomeRegion = "us-west-2",
    Target = new()
        { Type = TargetType.ACCOUNT, Id = "123456789012" } });`,
  azCli:`az migrate project create -g myRG \\
  -n myMigrateProject --location eastus`,
  azPy:`from azure.mgmt.resource import (
    ResourceManagementClient)
r.resources.begin_create_or_update_by_id(
    migrate_project_id, "2019-10-01",
    {"location": "eastus"})`,
  azCs:`// Azure Migrate projects are created via ARM / REST
// (resource type Microsoft.Migrate/migrateProjects).`},

 {cat:"Migration", icon:"🚚", aws:"AWS Database Migration Service", az:"Azure Database Migration Service",
  desc:"Migrate databases to the cloud with minimal downtime.",
  ex:"Move an on-prem SQL Server to a managed cloud database.",
  awsUrl:"https://docs.aws.amazon.com/dms/", azUrl:"https://learn.microsoft.com/en-us/azure/dms/",
  awsCli:`aws dms create-replication-instance \\
  --replication-instance-identifier my-dms \\
  --replication-instance-class dms.t3.medium`,
  awsPy:`import boto3
boto3.client("dms").create_replication_instance(
    ReplicationInstanceIdentifier="my-dms",
    ReplicationInstanceClass="dms.t3.medium")`,
  awsCs:`var dms = new AmazonDatabaseMigrationServiceClient();
await dms.CreateReplicationInstanceAsync(new() {
    ReplicationInstanceIdentifier = "my-dms",
    ReplicationInstanceClass = "dms.t3.medium" });`,
  azCli:`az dms create -g myRG -n myDMS \\
  --location eastus --sku-name Standard_1vCore`,
  azPy:`from azure.mgmt.datamigration import (
    DataMigrationManagementClient)
d = DataMigrationManagementClient(
    DefaultAzureCredential(), SUB_ID)
d.services.begin_create_or_update(service, "myRG", "myDMS")`,
  azCs:`var dms = new DataMigrationManagementClient(cred)
    { SubscriptionId = subId };
await dms.Services.CreateOrUpdateAsync(
    service, "myRG", "myDMS");`},
];
